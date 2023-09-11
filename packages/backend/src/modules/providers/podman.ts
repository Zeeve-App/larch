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
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import { ZOMBIENET_NETWORKS_EXECUTION_DIR } from '../../config.js';
import { readFromYamlFile, writeToYamlFile } from '../../utils/fs_helper.js';

const execAsync = promisify(exec);

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

export const writeToGrafanaYaml = async (fsPath: string, grafanaDoc: any): Promise<void> => {

  const dashboardsPath = path.join(__dirname, '../modules/dashboards');
  const dashboardProvisioningConfigPath = path.join(__dirname, '../modules/dashboards/config');

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
        path: dashboardProvisioningConfigPath,
      },
    },
    {
      name: 'dashboard-json',
      hostPath: {
        type: 'Directory',
        path: dashboardsPath,
      },
    },
  ];
  await writeToYamlFile(fsPath, grafanaDoc, { lineWidth: -1 });
  console.info(`Data is written to ${fsPath} successfully`);
};

export const updateGrafanaPod = async (networkName: string): Promise<void> => {
  try {
    // Get namespace from grafana.yaml
    const grafanaConfigPath = `${ZOMBIENET_NETWORKS_EXECUTION_DIR}/${networkName}/grafana.yaml`;
    const grafanaDoc = await readFromYamlFile(grafanaConfigPath)
    const namespace = grafanaDoc?.metadata?.namespace;
    if (!namespace) throw new Error(`Namespace not found for network: ${networkName}`);

    let command = `podman pod ps -f label=zombie-ns=${namespace} --format {{.Name}}`;
    let response = await execAsync(command);
    if(response.stderr) throw new Error(response.stderr);
    console.log({ command, response: response.stdout });

    // Remove the pod which includes grafana in it's name
    command = `podman pod rm -f ${response.stdout.trim().split('\n').filter((pod) => pod.includes('grafana')).flatMap((pod) => pod)}`;
    console.log({ command });
    response = await execAsync(command);
    if(response.stderr) throw new Error(response.stderr);

    // Write to grafana.yaml and start pod from grafana.yaml
    await writeToGrafanaYaml(grafanaConfigPath, grafanaDoc);
    command = `podman play kube ${grafanaConfigPath} --network ${namespace}`;
    console.log({ command });
    response = await execAsync(command);
    if(response.stderr) throw new Error(response.stderr);

  } catch (error) {
    console.error(error);
  }
}
