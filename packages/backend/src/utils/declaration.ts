import { homedir } from 'os';

export const VERSION:string = '1.3.40';

export const LARCH_VERSION = process.env.npm_package_version;

export const PROVIDER_NAME = 'podman';

export const ZOMBIENET_BINARY_DOWNLOAD_BASE_URL = 'https://github.com/paritytech/zombienet/releases/download';
export const LARCH_CONTEXT_DIR = `${homedir()}/.larch`;

export type DownloadFileToAPathParams = {
  downloadUrl: string;
  filePath: string;
  progressRefreshInMs?: number;
  progressCb?: (fileSize: number, currentFileSize: number) => void;
};
