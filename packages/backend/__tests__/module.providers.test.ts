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

