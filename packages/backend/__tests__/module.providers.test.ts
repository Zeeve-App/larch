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

import path from 'path';
import { test, describe, expect } from 'vitest'
import * as podman from '../src/modules/providers/podman';
import * as common from '../src/modules/providers/common';

const CURRENT_DIR = __dirname;

describe('Podman', () => {
    test("should get Podman namespace for Zombienet network", async () => {
      const namespace = await podman.getNamespace(path.join(CURRENT_DIR, 'assets'));
      expect(namespace).toBe('zombie-6b302120');
    });
    test("should get Podman cleanup", async () => {
      const cleanupResponse = podman.cleanUp('zombie-6b302120', 'zombie-6b302120');
      expect(cleanupResponse).resolves.toBe(undefined);
    });
    test("should check Zombie JSON for Zombienet network", async () => {
      const networkPath = path.join(CURRENT_DIR, 'assets');
      const isPresent = await podman.checkZombieJson(path.join(CURRENT_DIR, 'assets'));
      expect(isPresent).toBe(true);
      const isPresentCommon = await common.isNetworkReady('podman', networkPath);
      expect(isPresentCommon).toBe(true);
    });
});

