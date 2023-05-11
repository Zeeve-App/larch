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
