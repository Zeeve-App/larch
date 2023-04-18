import { test, expect, describe } from 'vitest';
import { ExecRun } from '../src/modules/models/exec_run';
import { downloadZombienetBinary, executePermissionToBinary, runZombienet } from '../src/modules/zombienet';



describe('downloadZombienetBinary', () => {
    test("downloadZombienetBinary", async () => {
        const version = '1.3.43'
        const result = downloadZombienetBinary(version);
        expect(result).toBeInstanceOf(Promise)

    })
})
describe('executePermissionToBinary', () => {
    test("executePermissionToBinary", async () => {
        const version = '1.3.43'
        const result = executePermissionToBinary(version);
        expect(result).toBeInstanceOf(Promise)

    })
})
describe('runZombienet', () => {
    test("runZombienet", async () => {
        const version = '1.3.43';
        const runInfo = new ExecRun();
        const result = await runZombienet({
            spawn: true,
            networkConfigPath: '/home/antar/.larch/networks/ATestNetwork',
            provider: 'podman',
            dir: '/home/antar/.larch/zomb',
          }, version, runInfo.id, 'ATestNetwork');

    })
})