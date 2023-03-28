export type DownloadFileToAPathParams = {
  downloadUrl: string;
  filePath: string;
  progressRefreshInMs?: number;
  progressCb?: (fileSize: number, currentFileSize: number) => void;
};
