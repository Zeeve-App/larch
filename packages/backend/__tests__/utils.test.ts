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

import { existsSync, unlinkSync, readFileSync, statSync } from 'fs';
import path from 'path';
import { test, expect, describe } from 'vitest'
import { checkPathExists, createDir, deleteDir, writeToFileFromBase64 } from '../src/utils/fs_helper';
import { downloadFileToAPath } from '../src/utils/download';
import { ZOMBIENET_BINARY_DOWNLOAD_BASE_URL } from '../src/config';


const CURRENT_DIR = __dirname;

const parentDir = path.join(CURRENT_DIR, 'parent_test_dir');
const testDir = path.join(parentDir, 'child_test_dir');
describe('file helpers', () => {
  test("should create directory", async () => {
    await createDir(testDir);
    existsSync(testDir)
    expect(existsSync(testDir)).toBe(true);
    await deleteDir(parentDir);
    expect(existsSync(testDir)).toBe(false);
  });
  test("should check file path", async () => {
    const result = await checkPathExists(__filename);
    expect(result).toBe(true);
  });
  test("typeof deleteDir", async () => {
    const filepath = path.join(CURRENT_DIR, 'testfile');
    const base64String = 'aGVsbG8=';
    await writeToFileFromBase64(
      filepath,
      base64String,
    );
    const buf = readFileSync(filepath)
    unlinkSync(filepath);
    expect(buf.toString('base64')).toBe(base64String);
  });
})


describe('file download', () => {
  test("should download file", async () => {
    const zombienetVersion = '1.3.43';
    const binaryDownloadUrl = `${ZOMBIENET_BINARY_DOWNLOAD_BASE_URL}/v${zombienetVersion}/zombienet-linux-x64`;
    const size = await fetch(binaryDownloadUrl).then(response => parseInt(response.headers.get("content-length") ?? '-1', 10))
    const filename = path.join(CURRENT_DIR, 'zombienet-bin');
    await downloadFileToAPath({
      downloadUrl: binaryDownloadUrl,
      filePath: filename,
      progressRefreshInMs: 400,
      progressCb: (fileSize, currentFileSize) => {
        console.log(`Total file size: ${fileSize}, Current file size: ${currentFileSize}, Percent downloaded: ${((currentFileSize / fileSize) * 100).toFixed(2)}`);
      },
    });
    const data = statSync(filename);
    unlinkSync(filename);
    expect(data.size).toBe(size);
  })
})
