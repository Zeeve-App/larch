import { startService, ServiceStartOptions } from './server.js';
import { knexInstance } from './modules/db/sqlite.js';
import { createDir } from './utils/fs_helper.js';
import { LARCH_CONTEXT_DIR } from './config.js';

export default async (serviceStartOptions: ServiceStartOptions) => {
  await createDir(LARCH_CONTEXT_DIR);
  console.log('Executing DB migrations');
  await knexInstance.migrate.latest();
  console.log('Done executing DB migrations');
  startService(serviceStartOptions);
};
