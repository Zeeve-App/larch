export type DownloadFileToAPathParams = {
  downloadUrl: string;
  filePath: string;
  progressRefreshInMs?: number;
  progressCb?: (fileSize: number, currentFileSize: number) => void;
};

export type ValidationErrorDetail = {
  path: Array<string | number>,
  message: string
};

export type HttpError = {
  type: 'VALIDATION_ERROR' | 'ERROR_NOT_FOUND',
  title: string,
  detail: Array<ValidationErrorDetail>,
  instance: string,
};
