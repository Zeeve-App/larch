/*
 * Copyright (C) Zeeve Inc.
 * This file is part of Larch.
 * Larch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Larch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Larch.  If not, see <http://www.gnu.org/licenses/>.
 */

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { execute } from '../exec_run.js';
import { ZOMBIENET_BIN_COLLECTION_DIR, ZOMBIENET_NETWORKS_EXECUTION_DIR } from '../../config.js';
import { checkPathExists, createDir, readFromYamlFile, writeToFileFromBase64, writeToYamlFile } from '../../utils/fs_helper.js';
import { grafanaProvisioningConfig, nodeExporterJson, dashboardJson } from '../dashboards/index.js'
import { downloadFileToAPath } from '../../utils/download.js';
import { constants } from 'node:fs';
import { homedir } from 'node:os';
import { execPromise } from '../../utils/misc.js';

export const getNamespace = async (networkDirectory: string): Promise<string> => {
  const data = await fs.readFile(path.join(networkDirectory, 'namespace'), 'utf-8');
  return JSON.parse(data).metadata.name;
};

export const cleanUp = async (namespace: string, networkId: string): Promise<void> => {
  const args = [
    'pod',
    'ps',
    '-f',
    `label=zombie-ns=${namespace}`,
    '--format',
    '{{.Name}}',
  ];
  const { code, stdout } = await execute(undefined, 'podman', args, 'NETWORK_CLEANUP', networkId, true);
  if (code !== 0 || stdout === null) return;
  const removePodArgs = ['pod', 'rm', '-f', ...stdout.toString('utf-8').trim().split('\n').map((pod) => pod.trim())];
  const { code: removePodCode } = await execute(
    undefined,
    'podman',
    removePodArgs,
    'NETWORK_CLEANUP',
    networkId,
    true,
  );
  console.log({ removePodCode });
  // now remove the network
  const removeNetworkArgs = ['network', 'rm', namespace];
  const { code: removeNetworkCode } = await execute(
    undefined,
    'podman',
    removeNetworkArgs,
    'NETWORK_CLEANUP',
    networkId,
    true,
  );
  console.log({ removeNetworkCode });
};

export const deleteDirUnshare = async (dirPath: string, networkName: string): Promise<void> => {
  const args = ['unshare', 'rm', '-r', dirPath];
  const { code } = await execute(undefined, 'podman', args, 'NETWORK_CLEANUP', networkName, true);
  if (code !== 0) throw new Error('Not able to deleted directory');
};

export const setPreRequisites = async (networkName: string): Promise<void> => {
  const args = ['pull', 'k8s.gcr.io/pause:3.5'];
  try {
    const { code } = await execute(undefined, 'podman', args, 'PODMAN_PREREQUISITES', networkName, true);
    if (code !== 0) console.error('Error while pulling podman pause image.');
  } catch (error) {
    console.error(error);
  }
};

export const writeToGrafanaYaml = async (networkName: string, fsPath: string, grafanaDoc: any): Promise<void> => {

  grafanaDoc.spec.containers[0] = {
    ...grafanaDoc.spec.containers[0],
    env: [
      {
        name: 'GF_PATHS_PROVISIONING',
        value: '/etc/grafana/provisioning',
      },
    ],
    volumeMounts: [
      ...(grafanaDoc.spec.containers[0].volumeMounts
        .filter(({ name }: { name: string }) => (name !== 'dashboard-config' && name !== 'dashboard-json'))
        || []),
      {
        name: 'dashboard-config',
        mountPath: '/etc/grafana/provisioning/dashboards',
        readOnly: false,
      },
      {
        name: 'dashboard-json',
        mountPath: '/var/lib/grafana/dashboards',
        readOnly: false,
      },
    ],
  };
  grafanaDoc.spec.volumes = [
    ...(grafanaDoc.spec.volumes
      .filter(({ name }: { name: string }) => (name !== 'dashboard-config' && name !== 'dashboard-json'))
      || []),
    {
      name: 'dashboard-config',
      hostPath: {
        type: 'Directory',
        path: `${ZOMBIENET_NETWORKS_EXECUTION_DIR}/${networkName}/dashboards/config`,
      },
    },
    {
      name: 'dashboard-json',
      hostPath: {
        type: 'Directory',
        path: `${ZOMBIENET_NETWORKS_EXECUTION_DIR}/${networkName}/dashboards`,
      },
    },
  ];
  await writeToYamlFile(fsPath, grafanaDoc, { lineWidth: -1 });
  console.info(`Data is written to ${fsPath} successfully`);
};

const storeGrafanaDashboardConfiguration = async (networkName: string): Promise<void> => {
  const dirPath = `${ZOMBIENET_NETWORKS_EXECUTION_DIR}/${networkName}`;
  await createDir(`${dirPath}/dashboards/config`);

  await Promise.all([
    writeToFileFromBase64(`${dirPath}/dashboards/polkadot.json`, dashboardJson),
    writeToFileFromBase64(`${dirPath}/dashboards/node_exporter.json`, nodeExporterJson),
    writeToFileFromBase64(`${dirPath}/dashboards/config/default.yaml`, grafanaProvisioningConfig),
  ])
}

export const updateGrafanaPod = async (networkName: string): Promise<void> => {
  try {
    // Get namespace from grafana.yaml
    const grafanaConfigPath = `${ZOMBIENET_NETWORKS_EXECUTION_DIR}/${networkName}/grafana.yaml`;
    const grafanaDoc = await readFromYamlFile(grafanaConfigPath)
    const namespace = grafanaDoc?.metadata?.namespace;
    if (!namespace) throw new Error(`Namespace not found for network: ${networkName}`);

    let command = `podman pod ps -f label=zombie-ns=${namespace} --format {{.Name}}`;
    const namespaceResponse = await execPromise(command)
    if (namespaceResponse.code != 0)
      throw new Error(`Error while performing podman rm code: ${namespaceResponse.code}`);
    console.log({ command, response: namespaceResponse.stdout });

    // Remove the pod which includes grafana in it's name
    command = `podman pod rm -f ${namespaceResponse.stdout.trim().split('\n').filter((pod) => pod.includes('grafana')).flatMap((pod) => pod)}`;
    console.log({ command });
    const podmanRMResponse = await execPromise(command)
    if (podmanRMResponse.code != 0)
      throw new Error(`Error while performing podman rm code: ${podmanRMResponse.code}`);

    // Write to grafana.yaml and create dashboard.json, default.yaml inside dashboard dir inside network folder
    await Promise.all([
      storeGrafanaDashboardConfiguration(networkName),
      writeToGrafanaYaml(networkName, grafanaConfigPath, grafanaDoc),
    ]);

    // start pod from grafana.yaml
    command = `podman play kube ${grafanaConfigPath} --network ${namespace}`;
    console.log({ command });
    const kubePlayResponse = await execPromise(command)
    if (kubePlayResponse.code != 0)
      throw new Error(`Error while performing kube play code: ${kubePlayResponse.code}`);

  } catch (error) {
    console.error(error);
  }
}


export const installNodeExporter = async () => {
  const NODE_EXPORTER_VERSION = '1.5.0';
  const finalDir = `node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64`;
  const binaryDownloadUrl = `https://github.com/prometheus/node_exporter/releases/download/v${NODE_EXPORTER_VERSION}/${finalDir}.tar.gz`
  const binaryAchievePath = path.join(ZOMBIENET_BIN_COLLECTION_DIR, `${finalDir}.tar.gz`);
  const binaryPath = path.join(ZOMBIENET_BIN_COLLECTION_DIR, finalDir, 'node_exporter');
  const pathExists = await checkPathExists(binaryPath);
  if (!pathExists) {
    await fs.mkdir(ZOMBIENET_BIN_COLLECTION_DIR, { recursive: true });
    await downloadFileToAPath({
      downloadUrl: binaryDownloadUrl,
      filePath: binaryAchievePath,
      progressRefreshInMs: 800,
      progressCb: (fileSize, currentFileSize) => {
        console.log(`Total file size: ${fileSize}, Current file size: ${currentFileSize}, Percent downloaded: ${((currentFileSize / fileSize) * 100).toFixed(2)}`);
      },
    });
    const extractCommand = `tar -xf ./${finalDir}.tar.gz`;
    await execPromise(extractCommand, {
      cwd: ZOMBIENET_BIN_COLLECTION_DIR
    });
    await fs.chmod(binaryPath, constants.S_IRUSR | constants.S_IWUSR | constants.S_IXUSR);
  }
  const systemdPath = path.join(homedir(), '.config', 'systemd', 'user');
  await fs.mkdir(systemdPath, { recursive: true });

  const unitFile = `
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
ExecStart=${binaryPath} --web.listen-address=:9902

[Install]
WantedBy=default.target
`
  await fs.writeFile(path.join(systemdPath, 'node_exporter.service'), unitFile, { encoding: 'utf-8' });
  await execPromise('systemctl --user daemon-reload', {
    cwd: ZOMBIENET_BIN_COLLECTION_DIR
  });
  await execPromise('systemctl --user start node_exporter.service', {
    cwd: ZOMBIENET_BIN_COLLECTION_DIR
  });
}

export const updatePrometheus = async (networkName: string) => {
  const prometheusPodmanConfigPath = `${ZOMBIENET_NETWORKS_EXECUTION_DIR}/${networkName}/prometheus.yaml`;
  const prometheusConfigPodmanData = await readFromYamlFile(prometheusPodmanConfigPath);

  const prometheusConfigVolumes = prometheusConfigPodmanData.spec.volumes;
  let prometheusConfigPath = '';
  prometheusConfigVolumes.forEach((volume: { name: string, hostPath: { path: string } }) => {
    if (volume.name == 'prom-cfg') {
      prometheusConfigPath = path.join(volume.hostPath.path, 'prometheus.yml');
    }
  });
  const prometheusConfigData = await readFromYamlFile(prometheusConfigPath);
  const scapeConfig = prometheusConfigData.scrape_configs as Array<any>;
  if (scapeConfig.findIndex((element) => element.job_name === 'node_exporter') === -1) {
    scapeConfig.push({
      'job_name': 'node_exporter',
      'static_configs': [{
        targets: ['host.containers.internal:9902']
      }]
    });
  }
  console.log({ prometheusConfigData });
  await writeToYamlFile(prometheusConfigPath, prometheusConfigData, { lineWidth: -1 });
  const namespace = prometheusConfigPodmanData?.metadata?.namespace;
  if (!namespace) throw new Error(`Namespace not found for network: ${networkName}`);

  let command = `podman pod ps -f label=zombie-ns=${namespace} --format {{.Name}}`;
  const namespaceResponse = await execPromise(command)
  if (namespaceResponse.code != 0)
    throw new Error(`Error while performing podman rm code: ${namespaceResponse.code}`);
  console.log({ command, response: namespaceResponse.stdout });
  console.log({ command, response: namespaceResponse.stdout });

  // Remove the pod which includes grafana in it's name
  command = `podman pod rm -f ${namespaceResponse.stdout.trim().split('\n').filter((pod) => pod.includes('prometheus')).flatMap((pod) => pod)}`;
  console.log({ command });
  const podmanRMResponse = await execPromise(command)
  if (podmanRMResponse.code != 0)
    throw new Error(`Error while performing podman rm code: ${podmanRMResponse.code}`);
  // start pod from grafana.yaml
  command = `podman play kube ${prometheusPodmanConfigPath} --network ${namespace}`;
  console.log({ command });
  const kubePlayResponse = await execPromise(command)
  if (kubePlayResponse.code != 0)
    throw new Error(`Error while performing kube play code: ${kubePlayResponse.code}`);
  let kubeInspectResponse = await execPromise('podman inspect prometheus_pod-prometheus');
  if (kubeInspectResponse.code != 0) {
    kubeInspectResponse = await execPromise('podman inspect prometheus-prometheus');
  }
  if (kubeInspectResponse.code != 0)
    throw new Error(`Error while performing kube play code: ${kubePlayResponse.code}`);
  const inspectInfo = JSON.parse(kubeInspectResponse.stdout);
  const ipAddress = inspectInfo[0]['NetworkSettings']['Networks'][namespace]['IPAddress'];
  const grafanaDataSourceConfigPath = path.join(ZOMBIENET_NETWORKS_EXECUTION_DIR, networkName, 'grafana', 'datasources', 'prometheus.yml');
  const grafanaDataSource = await readFromYamlFile(grafanaDataSourceConfigPath);
  const datasources = grafanaDataSource.datasources as Array<any>;

  datasources.forEach((element: { name: string, url: string }, index) => {
    if (element.name === 'Prometheus') {
      datasources[index].url = `http://${ipAddress}:9090`
    }
  });
  await writeToYamlFile(grafanaDataSourceConfigPath, grafanaDataSource, { lineWidth: -1 });
}