import { startService, ServiceStartOptions } from './server.js';
import { knexInstance } from './modules/db/sqlite.js';
import { createDir } from './utils/fs_helper.js';
import { LARCH_CONTEXT_DIR } from './config.js';
import { AppError } from './utils/declaration.js';

export default async (serviceStartOptions: ServiceStartOptions) => {
  await createDir(LARCH_CONTEXT_DIR);
  console.log('Executing DB migrations');
  await knexInstance.migrate.latest();
  console.log('Done executing DB migrations');
  startService(serviceStartOptions);
};

process.on('unhandledRejection', (error) => {
  throw error;
});

process.on('uncaughtException', (error) => {
  console.error(error);

  if (!(error instanceof AppError)) {
    process.exit(1);
  }
});
