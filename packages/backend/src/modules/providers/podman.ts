import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { execute } from '../exec_run.js';

export const do1 = '';

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
  const { code, stdout } = await execute(undefined, 'podman', args.join(' '), 'NETWORK_CLEANUP', networkId, true);
  if (code !== 0 || stdout === null) return;
  const removePodArgs = ['pod', 'rm', '-f', ...stdout.toString('utf-8').split('\n')];
  const { code: removePodCode } = await execute(undefined, 'podman', removePodArgs.join(' '), 'NETWORK_CLEANUP', networkId, true);
  console.log({ removePodCode });
  // now remove the network
  const removeNetworkArgs = ['network', 'rm', namespace];
  const { code: removeNetworkCode } = await execute(undefined, 'podman', removeNetworkArgs.join(' '), 'NETWORK_CLEANUP', networkId, true);
  console.log({ removeNetworkCode });
};
