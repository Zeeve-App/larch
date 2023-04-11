import { test, expect, describe } from 'vitest'
import supertest from 'supertest';
import { startService } from '../src/server.js';
import { DIRECTORY_NAME, FILE_NAME, NETWORK_NAME, CONFIG_FILE, NETWORK_PROVIDER, TEST_FILE_NAME, TEST_FILE_CONTENT } from './test.variables';
import { Network } from '../src/modules/models/network.js';
import { ExecRun } from '../src/modules/models/exec_run.js';
import { Template } from '../src/modules/models/template.js';
import { UserOperation } from '../src/modules/models/user_operation.js';

const app = startService({ httpPort: 9000, disableApi: false, disableUi: false });

function print(path, layer) {
  if (layer.route) {
    layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
  } else if (layer.method) {
    console.log('%s /%s',
      layer.method.toUpperCase(),
      path.concat(split(layer.regexp)).filter(Boolean).join('/'))
  }
}

function split(thing) {
  if (typeof thing === 'string') {
    return thing.split('/')
  } else if (thing.fast_slash) {
    return ''
  } else {
    var match = thing.toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>'
  }
}

app._router.stack.forEach(print.bind(null, []))


// Test Cases for Health Route

describe('Health route endpoint', () => {
  test('should return success msg', async () => {
    const res = await supertest(app)
      .get('/healthz')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      "message": "Larch service is healthy"
    })
  })
})

describe('Health route endpoint', () => {
  test('if the server is ok, the status should be not equals to 400', async () => {
    const res = await supertest(app)
      .get('/healthz')
    expect(res.statusCode).not.toEqual(404)
  })
})

describe('Health route endpoint', () => {
  test('if the server is not ok, the status should be not equals to 200', async () => {
    const res = await supertest(app)
      .get('/health')
    expect(res.statusCode).not.toEqual(200)
  })
})

describe('Health route endpoint', () => {
  test('check for the response body and response type', async () => {
    const res = await supertest(app)
      .get('/healthz')
    expect(res && res.body && typeof res.body === 'object')
  })
})

// Version API

describe('Network route endpoint', () => {
  test('check for response and the type of response', async () => {
    const res = await supertest(app)
      .get('/api/larch/version/')
    expect(res && res.body && typeof res.body === 'object')
  })
})

describe('Version route endpoint', () => {
  test('should return the current version of the application', async () => {
    const res = await supertest(app)
      .get('/api/larch/version/')
    expect(res.body).toEqual({
      "zombienet-version": "1.3.43",
      "larch-version": "1.0.0"
    })
  })
})

describe('Version route endpoint', () => {
  test('should return the current version of the application', async () => {
    const res = await supertest(app)
      .get('/api/larch/version/')
    expect(res.statusCode).toEqual(200)
  })
})

// Test Display Network API

describe('network route endpoint', () => {
  test('this is a get request this should return success msg', async () => {
    const res = await supertest(app)
      .get('/api/larch/network/')
      .query({ networkName: 'ATestNetwork' })
    expect(res && res.body && typeof res.body === 'object')
    expect(res.body).toEqual({
      "result": {
        "configContent": "IyBleGFtcGxlcy8wMDAxLXNtYWxsLW5ldHdvcmsudG9tbApbcmVsYXljaGFpbl0KZGVmYXVsdF9pbWFnZSA9ICJkb2NrZXIuaW8vcGFyaXR5L3BvbGthZG90OmxhdGVzdCIKZGVmYXVsdF9jb21tYW5kID0gInBvbGthZG90IgpkZWZhdWx0X2FyZ3MgPSBbICItbHBhcmFjaGFpbj1kZWJ1ZyIgXQoKY2hhaW4gPSAicm9jb2NvLWxvY2FsIgoKICBbW3JlbGF5Y2hhaW4ubm9kZXNdXQogIG5hbWUgPSAiYWxpY2UiCiAgdmFsaWRhdG9yID0gdHJ1ZQoKICBbW3JlbGF5Y2hhaW4ubm9kZXNdXQogIG5hbWUgPSAiYm9iIgogIHZhbGlkYXRvciA9IHRydWUKCltbcGFyYWNoYWluc11dCmlkID0gMTAwCgogIFtwYXJhY2hhaW5zLmNvbGxhdG9yXQogIG5hbWUgPSAiY29sbGF0b3IwMSIKICBpbWFnZSA9ICJkb2NrZXIuaW8vcGFyaXR5L3BvbGthZG90LXBhcmFjaGFpbjpsYXRlc3QiCiAgY29tbWFuZCA9ICJwb2xrYWRvdC1wYXJhY2hhaW4iCiAgYXJncyA9IFsiLWxwYXJhY2hhaW49ZGVidWciXQ==",
        "configFilename": "0001-small-network.toml",
        "createdAt": "2023-04-06 21:32:58",
        "id": "ATestNetwork",
        "name": "ATestNetwork",
        "networkDirectory": "/home/antar/.larch/my-zombieNetLogs",
        "networkProvider": "podman",
        "networkState": "failed",
        "testContent": "RGVzY3JpcHRpb246IFNtYWxsIE5ldHdvcmsgdGVzdApOZXR3b3JrOiAuLzAwMDEtc21hbGwtbmV0d29yay50b21sCkNyZWRzOiBjb25maWcKCiMgVHJhY2luZwojIGFsaWNlOiB0cmFjZSB3aXRoIHRyYWNlSUQgOTRjMTUwMWE3OGEwZDgzYzQ5OGNjOTJkZWVjMjY0ZDkgY29udGFpbnMgWyJhbnN3ZXItY2h1bmstcmVxdWVzdCIsICJhbnN3ZXItY2h1bmstcmVxdWVzdCJdCgojIG1ldHJpY3MKYWxpY2U6IHJlcG9ydHMgbm9kZV9yb2xlcyBpcyA0CmFsaWNlOiByZXBvcnRzIHN1Yl9saWJwMnBfaXNfbWFqb3Jfc3luY2luZyBpcyAwCgojIGhpc3RvZ3JhbQphbGljZTogcmVwb3J0cyBoaXN0b2dyYW0gcG9sa2Fkb3RfcHZmX2V4ZWN1dGlvbl90aW1lIGhhcyBhdCBsZWFzdCAyIHNhbXBsZXMgaW4gYnVja2V0cyBbIjAuMSIsICIwLjI1IiwgIjAuNSIsICIrSW5mIl0gd2l0aGluIDEwMCBzZWNvbmRzCgojIGxvZ3MKYm9iOiBsb2cgbGluZSBtYXRjaGVzIGdsb2IgIipydGVkICMxKiIgd2l0aGluIDEwIHNlY29uZHMKYm9iOiBsb2cgbGluZSBtYXRjaGVzICJJbXBvcnRlZCAjWzAtOV0rIiB3aXRoaW4gMTAgc2Vjb25kcwoKIyBzeXN0ZW0gZXZlbnRzCmJvYjogc3lzdGVtIGV2ZW50IGNvbnRhaW5zICJBIGNhbmRpZGF0ZSB3YXMgaW5jbHVkZWQiIHdpdGhpbiAyMCBzZWNvbmRzCmFsaWNlOiBzeXN0ZW0gZXZlbnQgbWF0Y2hlcyBnbG9iICIqd2FzIGJhY2tlZCoiIHdpdGhpbiAxMCBzZWNvbmRzCgojcGFyYWNoYWluIHRlc3RzCmFsaWNlOiBwYXJhY2hhaW4gMTAwIGlzIHJlZ2lzdGVyZWQgd2l0aGluIDIyNSBzZWNvbmRzCmFsaWNlOiBwYXJhY2hhaW4gMTAwIGJsb2NrIGhlaWdodCBpcyBhdCBsZWFzdCAxMCB3aXRoaW4gMjAwIHNlY29uZHM=",
        "testFilename": "0001-small-network.zndsl",
        "updatedAt": null,
      },
      "success": true,
    })
  })
})

describe('network route endpoint', () => {
  test('should return success msg', async () => {
    const res = await supertest(app)
      .get('/api/larch/network/')
      .query({ networkName: 'ATestNetwork' })
    expect(res && res.body && typeof res.body === 'object')
  })
})

// Test Listing API

describe('network route endpoint', () => {
  test('should return success msg', async () => {
    const res = await supertest(app)
      .post('/api/larch/network/list')
      .send({
        "filter": {
          "networkName": "ATestNetwork",
        },
        "meta": {
          pageNum: 0,
          numOfRec: 2
        }
      })
    expect(res && res.body && typeof res.body === 'object')
    expect(res.success === 'true')
    expect(res.body.success === 'true')
    expect(res.body).not.toEqual({ })
    })
  })

  // Create Network API

describe('Create Network Endpoint', () => {
  test('should return an object with the network-name,directory-name,file-name and configuration-file', async () => {
    const res = await supertest(app)
      .post('/api/larch/network/create/')
      .send({
        "name": NETWORK_NAME,
        "configFilename": FILE_NAME,
        "configContent": CONFIG_FILE,
        "networkDirectory": DIRECTORY_NAME,
        "networkProvider": NETWORK_PROVIDER,
        "testFilename": TEST_FILE_NAME,
        "testContent": TEST_FILE_CONTENT,

      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.success).toEqual(true);
    // console.log(res.body)
  })
})


  // Update Network API

  describe('Update Network Endpoint', () => {
  test('it should return success message and status code should be equal to 200', async () => {
    const res = await supertest(app)
      .post('/api/larch/network/update/')
      .query({ networkName: 'ATestNetwork' })
      .send({
        "testFilename": TEST_FILE_NAME,
        "testContent": TEST_FILE_CONTENT,
        "configFilename": FILE_NAME,
        "configContent": CONFIG_FILE,

      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.success).toEqual(true);
  })
})
describe('Update Network Endpoint', () => {
  test('it should return success message and status code should be equal to 200', async () => {
    const res = await supertest(app)
      .post('/api/larch/network/update/')
      .query({ networkName: 'ATestNetwork' })
      .send({
        "testFilename": TEST_FILE_NAME,
        "testContent": TEST_FILE_CONTENT,
        "configFilename": FILE_NAME,

      })
    expect(res.statusCode).toEqual(200)
    expect(res.body.success).toEqual(true);
  })
})

describe('Update Network Endpoint', () => {
  test('it should return error message and status code should be equal to 404', async () => {
    const networkName = '';
    const res = await supertest(app)
      .post('/api/larch/network/update/')
      .query({ networkName: networkName })
      const network = new Network(networkName);
      const networkExists = await network.exists();
      if (!networkExists) {
        expect(res.statusCode).toEqual(404)
        expect(res.body.success).toEqual(false);
      }
    })
  })

// Test Cases For Delete API

describe('Delete Network Endpoint', () => {
  test('it should return error message and status code should be equal to 404', async () => {
    const networkName = '';
    const res = await supertest(app)
      .get('/api/larch/network/delete/')
      .query({ networkName: networkName })
      const network = new Network(networkName);
      const networkExists = await network.exists();
      if (!networkExists) {
        expect(res.statusCode).toEqual(404)
        expect(res.body.success).toEqual(false);
      } else {
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toEqual(true)
        expect(res.body.result.name).toEqual(networkName)
      }
    })
  })

 // Test Cases Test Network API

describe('Test Network route endpoint', () => {
  test('it should return error message and status code should be equal to 404', async () => {
    const networkName = '';
    const res = await supertest(app)
      .post('/api/larch/network/test/')
      .query({ networkName: networkName })
      const network = new Network(networkName);
      const networkExists = await network.exists();
      if (!networkExists) {
        expect(res.statusCode).toEqual(404)
        expect(res.body.success).toEqual(false);
      } else {
        expect(res && res.body && typeof res.body === 'object')
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toEqual(true)
      }
  })
})

// Network Run API

describe('Test Network Run endpoint', () => {
  test('it should return error message and status code should be equal to 404', async () => {
    const runId = '';
    const res = await supertest(app)
      .get('/api/larch/network/test/')
      .query({ runId: runId })
      const execRun = new ExecRun(runId);
      const execRunExists = await execRun.exists();
      if (!execRunExists) {
        expect(res.statusCode).toEqual(404)
        expect(res.body.success).toEqual(false);
      } else {
        expect(res && res.body && typeof res.body === 'object')
        expect(res.statusCode).toEqual(200)
        expect(res.body.success).toEqual(true)
      }
      
  })
})

// Test Status API

describe('Test Status endpoint', () => {
  test('it should return error message and status code should be equal to 404', async () => {
    const networkName = '';
    const res = await supertest(app)
      .post('/api/larch/network/test/')
      .query({ networkName: networkName })
      const network = new Network(networkName);
      const networkExists = await network.exists();
      if (!networkExists) {
        expect(res.statusCode).toEqual(404)
        expect(res.body.success).toEqual(false)
        expect(res.body.error.type).toEqual('ERROR_NOT_FOUND');
      } else {
        expect(res.body.name).toEqual(networkName);
      }
      
  })
})

describe('Create Network Template API', () => {
  test('should return a success value of true', async () => {
    const res = await supertest(app)
      .post('/api/larch/template/create/')
      .send({
        "name": NETWORK_NAME,
        "configFilename": FILE_NAME,
        "configContent": CONFIG_FILE,
        "networkDirectory": DIRECTORY_NAME,
        "networkProvider": NETWORK_PROVIDER,
        "testFilename": TEST_FILE_NAME,
        "testContent": TEST_FILE_CONTENT,
      })
    expect(res.body.success).toEqual(true);
  })
})

describe('Find Network Template API', () => {
  test('if a correct template id is given it will return the template info as result and a success message', async () => {
    const templateId = '';
    const res = await supertest(app)
      .get('/api/larch/template/')
      .query({ templateId: templateId })
      const template = new Template(templateId);
      const templateExists = await template.exists();
      if (!templateExists) {
        expect(res.statusCode).toEqual(404)
        expect(res.body.success).toEqual(false);
      } else {
        expect(res.body.success).toEqual(true);
      } 
    })
  })

  describe('Update Network Template API', () => {
    test('This is a post request if a correct template id is given it will return the template info as result and a success message', async () => {
      const templateId = '';
      const res = await supertest(app)
        .post('/api/larch/template/update/')
        .query({ templateId: templateId })
        .send({
          "name": NETWORK_NAME,
          "configFilename": FILE_NAME,
          "configContent": CONFIG_FILE,
          "networkDirectory": DIRECTORY_NAME,
          "networkProvider": NETWORK_PROVIDER,
          "testFilename": TEST_FILE_NAME,
          "testContent": TEST_FILE_CONTENT,
        })
        const template = new Template(templateId);
        const templateExists = await template.exists();
        if (!templateExists) {
          expect(res.statusCode).toEqual(404)
          expect(res.body.success).toEqual(false);
        } else {
          expect(res.body.success).toEqual(true);
        } 
      })
    })


describe('Delete Network Template API', () => {
  test('This is a get request if a correct template id is given it will delete the template info as result and a success message else it will throw error', async () => {
    const templateId = '';
    const res = await supertest(app)
      .get('/api/larch/template/delete/')
      .query({ templateId: templateId })
      const template = new Template(templateId);
      const templateExists = await template.exists();
      if (!templateExists) {
        expect(res.statusCode).toEqual(404)
        expect(res.body.success).toEqual(false);
      } else {
        expect(res.body.success).toEqual(true);
        expect(res.body.result.id).toEqual(templateId);
      } 
    })
  })

  describe('Pagination of template API', () => {
  test('This is a post should return success msg and a response body of type object', async () => {
    const res = await supertest(app)
      .post('/api/larch/template/list')
      .send({
        "filter": {
          "networkName": "ATestNetwork",
        },
        "meta": {
          pageNum: 0,
          numOfRec: 2
        }
      })
    expect(res && res.body && typeof res.body === 'object')
    expect(res.body.success === 'true')
    expect(res.body).not.toEqual({ })
    })
  })

  describe('Clone Network Template API', () => {
    test('This is a get request if a correct template id is given it will clone the template and as result and a success message will be sent', async () => {
      const templateId = '';
      const res = await supertest(app)
        .get('/api/larch/template/clone/')
        .query({ templateId: templateId })
         expect(res.body.success).toEqual(true);
        
      })
    })

describe('Test User Operation "/" API', () => {
  test('This is a get request if a correct operation id is given it will return the operation info as result and a success message else it will throw error', async () => {
    const operationId = '';
    const res = await supertest(app)
      .get('/api/larch//user_operation/')
      .query({ operationId: operationId })
      const userOperation = new UserOperation(operationId);
      const userOperationExists = await userOperation.exists();
      if (!userOperationExists) {
        expect(res.statusCode).toEqual(404)
        expect(res.body.success).toEqual(false);
      } else {
        expect(res.body.success).toEqual(true);
      } 
    })
  })

  describe('Test User Operation purge API', () => {
    test('This is a get request if a correct operation id is given it will return the operation info as result and a success message else it will throw error', async () => {
      const res = await supertest(app)
        .get('/api/larch//user_operation/purge/')
          expect(res.body.success).toEqual(true)
          expect(res.body.result).toEqual({});
        
      })
    })

describe('Pagination of User Operation API', () => {
  test('This is a post should return success msg and a response body of type object', async () => {
    const res = await supertest(app)
      .post('/api/larch/user_operation/list')
      .send({
        "filter": {
          "networkName": "",
        },
        "meta": {
          pageNum: 0,
          numOfRec: 2
        }
      })
      console.log(res.body)
    expect(res && res.body && typeof res.body === 'object')
    expect(res.body.success === 'true')
    expect(res.body).not.toEqual({ })
    expect(typeof res.body.meta.pageNum === 'number' && typeof res.body.meta.numOfRec === 'number' && typeof res.body.meta.total === 'number')
    })
  })