import { homedir } from 'os';

export const LARCH_CONTEXT_DIR = `${homedir()}/.larch`;
export const LARCH_VERSION = process.env.npm_package_version;
export const LARCH_DEFAULT_PROVIDER_NAME = 'podman';
export const ZOMBIENET_VERSION:string = '1.3.40';

export const ZOMBIENET_BINARY_DOWNLOAD_BASE_URL = 'https://github.com/paritytech/zombienet/releases/download';
