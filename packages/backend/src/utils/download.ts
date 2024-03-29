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
import * as fs from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';
import { finished } from 'node:stream/promises';
import { DownloadFileToAPathParams } from './declaration.js';

/**
 * Download the file to a given path
 * @param {DownloadFileToAPathParams} downloadFileToAPathParams - progressRefreshInMs
 * (default: 1000ms) and progressCb are optional
 * @returns Promise<void>
 */
export const downloadFileToAPath = (
  downloadFileToAPathParams: DownloadFileToAPathParams,
): Promise<void> => fetch(downloadFileToAPathParams.downloadUrl, {
  method: 'GET',
  redirect: 'follow',
}).then((response) => new Promise((resolve, reject) => {
  if (!response.ok) {
    reject(new Error('Unable to download binary'));
    return;
  }
  const fileSize = parseInt(response.headers.get('content-length')!, 10);
  const dest = createWriteStream(downloadFileToAPathParams.filePath);
  const updateFileSize = async () => {
    const currentFileSize = (await fs.stat(downloadFileToAPathParams.filePath)).size;
    downloadFileToAPathParams.progressCb!(fileSize, currentFileSize);
  };

  let interval: NodeJS.Timeout;
  if (downloadFileToAPathParams.progressCb) {
    const progressRefreshInMs = typeof downloadFileToAPathParams.progressRefreshInMs === 'number'
      ? downloadFileToAPathParams.progressRefreshInMs : 1000;
    interval = setInterval(updateFileSize, progressRefreshInMs);
  }

  // @ts-ignore
  finished(Readable.fromWeb(response.body!).pipe(dest))
    .then(async () => {
      clearInterval(interval);
      if (downloadFileToAPathParams.progressCb) await updateFileSize();
      resolve();
    });

  dest.on('error', (err) => {
    clearInterval(interval);
    reject(err);
  });
}));
