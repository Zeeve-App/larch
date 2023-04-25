import { homedir } from 'os';
import * as versionInfo from './version.js';

export const LARCH_CONTEXT_DIR = `${homedir()}/.larch`;
export const LARCH_VERSION = versionInfo.default.version;
export const LARCH_DEFAULT_PROVIDER_NAME = 'podman';
export const ZOMBIENET_VERSION: string = '1.3.43';
export const ZOMBIENET_BIN_COLLECTION_DIR = `${LARCH_CONTEXT_DIR}/bin`;
export const ZOMBIENET_NETWORKS_COLLECTION_DIR = `${LARCH_CONTEXT_DIR}/networks`;
export const ZOMBIENET_NETWORKS_EXECUTION_DIR = `${LARCH_CONTEXT_DIR}/exec`;

export const ZOMBIENET_BINARY_DOWNLOAD_BASE_URL = 'https://github.com/paritytech/zombienet/releases/download';
