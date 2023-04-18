import { test, describe } from 'vitest'
import { networkCleanUp } from '../src/modules/providers/common';
import { getNamespace, cleanUp, deleteDirUnshare } from '../src/modules/providers/podman';


describe('networkCleanUp', () => {
    test("networkCleanUp", async () => {
        const result = networkCleanUp('podman','TestNetwork','/home/antar/Desktop/Example');
    })
})

describe('getNamespace', () => {
    test("getNamespace", async () => {
        const result = getNamespace('Example');
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


