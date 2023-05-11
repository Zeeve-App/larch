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
