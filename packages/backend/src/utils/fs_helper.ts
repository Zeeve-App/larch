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

import * as fs from 'node:fs/promises';

/**
 * Create the directory with parent directory if not present (recursively)
 * @param {string} dirPath directory path
 */
export const createDir = async (dirPath: string): Promise<void> => {
  await fs.mkdir(dirPath, { recursive: true });
};

export const deleteDir = async (dirPath: string): Promise<void> => {
  await fs.rm(dirPath, { recursive: true, force: true });
};

export const checkPathExists = async (fsPath: string): Promise<boolean> => fs.access(
  fsPath,
  fs.constants.F_OK,
)
  .then(() => true)
  .catch(() => false);

export const writeToFileFromBase64 = async (
  fsPath: string,
  dataInBase64: string,
): Promise<void> => {
  await fs.writeFile(fsPath, dataInBase64, { encoding: 'base64' });
};

export const escapePath = (path: string) => path.replace(/(\s+)/g, '\\$1');
