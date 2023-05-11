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
