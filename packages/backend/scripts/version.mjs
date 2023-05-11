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
console.log(rootPath)

const packageJson = JSON.parse(await fs.readFile(path.join(rootPath, '../../cli/package.json'), { encoding: 'utf-8' }));

const versionJson = `/*
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

// Managed by version script - do not edit directly
export default { version: '${packageJson.version}' };
`;

await fs.writeFile(path.join(rootPath, '../src/version.ts'), versionJson);
