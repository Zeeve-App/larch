import { test, expect, describe } from 'vitest'
import { startNetwork } from '../src/zombienet-installer/startNetwork';

let str1 = "my-zombienet";
let str2 = "small-network.json";
let str3 = "A Simple Test Network";
let str4 = "ewogICJyZWxheWNoYWluIjogewogICAgImRlZmF1bHRfaW1hZ2UiOiAiZG9ja2VyLmlvL3Bhcml0eXByL3BvbGthZG90LWRlYnVnOm1hc3RlciIsCiAgICAiZGVmYXVsdF9jb21tYW5kIjogInBvbGthZG90IiwKICAgICJkZWZhdWx0X2FyZ3MiOiBbCiAgICAgICItbHBhcmFjaGFpbj1kZWJ1ZyIKICAgIF0sCiAgICAiY2hhaW4iOiAicm9jb2NvLWxvY2FsIiwKICAgICJub2RlcyI6IFsKICAgICAgewogICAgICAgICJuYW1lIjogImFsaWNlIiwKICAgICAgICAidmFsaWRhdG9yIjogdHJ1ZQogICAgICB9LAogICAgICB7CiAgICAgICAgIm5hbWUiOiAiYm9iIiwKICAgICAgICAiaW1hZ2UiOiAiZG9ja2VyLmlvL3Bhcml0eXByL3BvbGthZG90LWRlYnVnOjUyMzYtMC45LjE4LWM1NTY2MGU5LWJlMTZiZDcyIiwKICAgICAgICAidmFsaWRhdG9yIjogdHJ1ZSwKICAgICAgICAiYXJncyI6IFsKICAgICAgICAgICItLWRhdGFiYXNlPXBhcml0eWRiLWV4cGVyaW1lbnRhbCIKICAgICAgICBdCiAgICAgIH0KICAgIF0KICB9Cn0=";

describe('It should pass', () => {
  test('Pass values', async () => {
    // const val = await startNetwork(str1,str2,str3,str4);
    // console.log(val);

    expect(startNetwork(str1,str2,str3,str4)).not.toBe("Good")
  })
})
