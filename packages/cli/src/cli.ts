import { Command } from 'commander';
import apiServer from 'larch-backend';
import * as versionInfo from './version.js';

export const program = new Command();

console.log('Welcome to Larch');

export default () => {
  program
    .version(versionInfo.default.version)
    .description('An CLI for managing polkadot parachain configuration')
    .option('--disable-ui', 'Disable Frontend')
    .option('--disable-api', 'Disable Backend')
    .option('--service-port <port>', 'Larch service HTTP listen port', '9000')
    .parse(process.argv);

  const options = program.opts();

  if (options.disableUi === 'true' && options.disableApi === 'true') {
    console.error('Both Larch services (UI & API) cannot be disabled at the same time');
    process.exit(1);
  }

  apiServer({
    httpPort: options.servicePort,
    disableUi: options.disableUi,
    disableApi: options.disableApi,
  });
};
