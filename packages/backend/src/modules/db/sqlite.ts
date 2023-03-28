/* eslint-disable import/prefer-default-export */
import knex, { Knex } from 'knex';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { LARCH_CONTEXT_DIR } from '../../config.js';

const currentSourcePath = dirname(fileURLToPath(import.meta.url));

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: `${LARCH_CONTEXT_DIR}/data.db`,
  },
  migrations: {
    tableName: 'migrations',
    directory: join(currentSourcePath, '../../../migrations'),
    extension: '.js',
  },
};

export const knexInstance = knex.knex(config);
