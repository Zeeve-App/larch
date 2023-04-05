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

type ErrorInput = {
  kind: string;
  message: string;
  cause?: unknown;
};
export class AppError extends Error {
  private errorKind: string;

  public message: string;

  public cause?: unknown;

  constructor({
    kind,
    message,
    cause,
  }: ErrorInput) {
    super(message, { cause });
    this.errorKind = kind;
    this.message = message;
    this.cause = cause;
  }

  print() {
    console.error({
      kind: this.errorKind,
      message: this.message,
      cause: this.cause,
    });
  }

  get kind(): string {
    return this.errorKind;
  }
}
