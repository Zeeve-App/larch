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

/* eslint-disable import/prefer-default-export */
import * as knex from 'knex';
import { Knex } from 'knex';
import { join } from 'path';

import { LARCH_CONTEXT_DIR } from '../../config.js';
import { convertRowFieldToCamelCase } from '../../utils/misc.js';

const currentSourcePath = __dirname;

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  postProcessResponse: (result, queryContext) => {
    if (Array.isArray(result)) {
      return result.map((row) => convertRowFieldToCamelCase(row));
    }
    return convertRowFieldToCamelCase(result);
  },
};

export const knexInstance = knex.knex(config);
