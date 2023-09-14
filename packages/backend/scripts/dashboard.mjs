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

import fs from 'node:fs/promises';
import * as path from 'path';

const rootPath = path.dirname(new URL(import.meta.url).pathname);
console.log(rootPath);

const [dashboardJson, grafanaProvisioningConfig] = await Promise.all([
  fs.readFile(path.join(rootPath, '../src/modules/dashboards/polkadot.json'), {encoding: 'base64'}),
  fs.readFile(path.join(rootPath, '../src/modules/dashboards/config/default.yaml'), {encoding: 'base64'}),
]);

const dataToBeWritten = `/* eslint-disable max-len */
export const grafanaProvisioningConfig = '${grafanaProvisioningConfig}';
export const dashboardJson = '${dashboardJson}';
`;

await fs.writeFile(path.join(rootPath, '../src/modules/dashboards/index.ts'), dataToBeWritten);