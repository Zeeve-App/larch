import nodeFetch from 'node-fetch';
import * as fs from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { DownloadFileToAPathParams } from './declaration.js';

/**
 * Download the file to a given path
 * @param {DownloadFileToAPathParams} downloadFileToAPathParams - progressRefreshInMs (default: 1000ms) and progressCb are optional 
 * @returns Promise<void>
 */
export const downloadFileToAPath = (downloadFileToAPathParams: DownloadFileToAPathParams): Promise<void> => {
  return nodeFetch(downloadFileToAPathParams.downloadUrl, {
    method: 'GET',
    redirect: 'follow',
  }).then(response => {
    return new Promise((resolve, reject) => {
      if (!response.ok) return reject(`Unable to download binary`);
      const updateFileSize = async () => {
        const currentFileSize = (await fs.stat(downloadFileToAPathParams.filePath)).size;
        downloadFileToAPathParams.progressCb!(fileSize, currentFileSize);
      };
      const fileSize = parseInt(response.headers.get('content-length')!, 10);
      const dest = createWriteStream(downloadFileToAPathParams.filePath);
      
      let interval: NodeJS.Timeout | undefined = undefined;
      if (downloadFileToAPathParams.progressCb) {
        downloadFileToAPathParams.progressRefreshInMs = typeof downloadFileToAPathParams.progressRefreshInMs === 'number'
        ? downloadFileToAPathParams.progressRefreshInMs : 1000;
        interval = setInterval(updateFileSize, downloadFileToAPathParams.progressRefreshInMs);
      }
      
      response.body?.pipe(dest);
      response.body?.on('end', () => {
        clearInterval(interval);
        downloadFileToAPathParams.progressCb && updateFileSize();
        resolve();
      });
      
      dest.on('error', (err) => {
        clearInterval(interval);
        reject(err);
      });
    });
  });
};