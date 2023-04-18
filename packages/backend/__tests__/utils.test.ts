import { test, expect, describe } from 'vitest'
import { testNetwork } from '../src/modules/network';
import { checkPathExists, createDir, deleteDir, writeToFileFromBase64 } from '../src/utils/fs_helper';
import { downloadFileToAPath } from '../src/utils/download';
import { ZOMBIENET_BINARY_DOWNLOAD_BASE_URL, ZOMBIENET_BIN_COLLECTION_DIR } from '../src/config';



describe('createDir', () => {
    test("createDir", async () => {
        const result = createDir('/home/antar/Desktop/Example');
        expect(result).toBeInstanceOf(Promise)

    })
})
describe('deleteDir', () => {
    test("deleteDir", async () => {
        const result = deleteDir('/home/antar/Desktop/Example');
        expect(result).toBeInstanceOf(Promise);

    })
})

describe('deleteDir', () => {
    test("deleteDir", async () => {
        const result = checkPathExists('/home/antar/Desktop/Example');
        expect(result).toBeInstanceOf(Promise);

    })
})
describe('deleteDir', () => {
    test("typeof deleteDir", async () => {
        const result = checkPathExists('/home/antar/Desktop/Example');
        expect(typeof result).toBe('object');

    })
})
describe('deleteDir', () => {
    test("typeof deleteDir", async () => {
        const result = writeToFileFromBase64('/home/antar/Desktop/Example/Go.json', 'ewogICJyZWxheWNoYWluIjogewogICAgImRlZmF1bHRfaW1hZ2UiOiAiZG9ja2VyLmlvL3Bhcml0eXByL3BvbGthZG90LWRlYnVnOm1hc3RlciIsCiAgICAiZGVmYXVsdF9jb21tYW5kIjogInBvbGthZG90IiwKICAgICJkZWZhdWx0X2FyZ3MiOiBbCiAgICAgICItbHBhcmFjaGFpbj1kZWJ1ZyIKICAgIF0sCiAgICAiY2hhaW4iOiAicm9jb2NvLWxvY2FsIiwKICAgICJub2RlcyI6IFsKICAgICAgewogICAgICAgICJuYW1lIjogImFsaWNlIiwKICAgICAgICAidmFsaWRhdG9yIjogdHJ1ZQogICAgICB9LAogICAgICB7CiAgICAgICAgIm5hbWUiOiAiYm9iIiwKICAgICAgICAiaW1hZ2UiOiAiZG9ja2VyLmlvL3Bhcml0eXByL3BvbGthZG90LWRlYnVnOjUyMzYtMC45LjE4LWM1NTY2MGU5LWJlMTZiZDcyIiwKICAgICAgICAidmFsaWRhdG9yIjogdHJ1ZSwKICAgICAgICAiYXJncyI6IFsKICAgICAgICAgICItLWRhdGFiYXNlPXBhcml0eWRiLWV4cGVyaW1lbnRhbCIKICAgICAgICBdCiAgICAgIH0KICAgIF0KICB9Cn0=');
        expect(result).toBeInstanceOf(Promise);

    })
})

describe('testNetwork', () => {
    test("testNetwork", async () => {
        const networkName = 'ATestNetwork'
        const result = testNetwork(networkName);
        expect(typeof result).not.toBe('');

    })
})
describe('download', () => {
    test("download", async () => {
        const zombienetVersion = '1.3.43';
        const zombienetBinNameByVersion = (zombienetVersion: string): string => `zombienet-${zombienetVersion}`;
        const zombienetBinPathByVersion = (zombienetVersion: string): string => `${ZOMBIENET_BIN_COLLECTION_DIR}/${zombienetBinNameByVersion(zombienetVersion)}`;
        const binaryDownloadUrl = `${ZOMBIENET_BINARY_DOWNLOAD_BASE_URL}/v${zombienetVersion}/zombienet-linux-x64`;
        const binaryVersionedPath = zombienetBinPathByVersion(zombienetVersion);
        const result = await downloadFileToAPath({
            downloadUrl: binaryDownloadUrl,
            filePath: binaryVersionedPath,
            progressRefreshInMs: 400,
            progressCb: (fileSize, currentFileSize) => {
                console.log(`Total file size: ${fileSize}, Current file size: ${currentFileSize}, Percent downloaded: ${((currentFileSize / fileSize) * 100).toFixed(2)}`);
            },
        });

    })
})
