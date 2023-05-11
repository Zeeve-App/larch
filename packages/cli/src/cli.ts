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
