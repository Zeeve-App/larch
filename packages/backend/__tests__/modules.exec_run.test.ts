import { test, expect, describe } from 'vitest'
import { removeInProgressNetwork, execute } from '../src/modules/exec_run'



describe('removeInProgressNetwork', () => {
    test("if Network name doesn't exist the function will return undefined", async () => {
        expect(removeInProgressNetwork('')).toBe(undefined);

    })
})

describe('execute', () => {
    test("execute zombienet run", async () => {
        expect(execute('00ea0e03-b5b0-49b8-8211-e91124efd866','/home/ubuntu/.larch/bin/zombienet-1.3.43','spawn /home/ubuntu/.larch/networks/ATestNetwork/0001-small-network.toml --provider podman --dir /home/ubuntu/.larch/my-zombienet --force','NETWORK_CREATE','ATestNetwork',false)).not.toBe({});

    })
})