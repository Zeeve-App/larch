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

import { test, describe } from 'vitest'
import { networkCleanUp , isNetworkReady} from '../src/modules/providers/common';
import { cleanUp, deleteDirUnshare, checkZombieJson } from '../src/modules/providers/podman';


describe('networkCleanUp', () => {
    test("networkCleanUp", async () => {
        const result = networkCleanUp('podman','','');
    })
})
describe('isNetworkReady', () => {
    test("isNetworkReady", async () => {
        const result = isNetworkReady('podman','');
    })
})
describe('cleanUp', () => {
    test("cleanUp", async () => {
        const result = cleanUp('','');
    })
})
describe('deleteDirUnshare', () => {
    test("deleteDirUnshare", async () => {
        const result = deleteDirUnshare('','');
    })
})
describe('checkZombieJson', () => {
    test("checkZombieJson", async () => {
        const result = checkZombieJson('');
    })
})

