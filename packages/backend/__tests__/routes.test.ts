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

import { test, expect, describe } from 'vitest'
import supertest from 'supertest';
import { startService } from '../src/server.js';
import { DIRECTORY_NAME, FILE_NAME, NETWORK_NAME, CONFIG_FILE, NETWORK_PROVIDER, TEST_FILE_NAME, TEST_FILE_CONTENT, TEST_NETWORK_NAME } from './assets/variables.js';
import { Network } from '../src/modules/models/network.js';
import { ExecRun } from '../src/modules/models/exec_run.js';
import { Template } from '../src/modules/models/template.js';
import { UserOperation } from '../src/modules/models/user_operation.js';
import { LARCH_VERSION, ZOMBIENET_VERSION } from '../src/config.js';

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
  test('should return success msg and return an object', async () => {
    const res = await supertest(app)
      .get('/healthz')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      "message": "Larch service is healthy"
    })
    expect(res.statusCode).not.toEqual(404)
    expect(res && res.body && typeof res.body === 'object')
  })
});

// Version API
describe('Version route endpoint', () => {
  test('check for response and the type of response', async () => {
    const res = await supertest(app)
      .get('/api/larch/version/')
    expect(res && res.body && typeof res.body === 'object')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
        "status": "success",
        "result": {
            "zombienetVersion": "1.3.43",
            "larchVersion": "1.0.0"
        }
    })
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
        "networkProvider": NETWORK_PROVIDER,
        "testFilename": TEST_FILE_NAME,
        "testContent": TEST_FILE_CONTENT,

      })
    expect(res.statusCode).toBeGreaterThanOrEqual(200);
  })
})


// Test Display Network API

describe('network route endpoint', () => {
  test('this is a get request this should return success msg', async () => {
    const res = await supertest(app)
      .get('/api/larch/network/')
      .query({ networkName: NETWORK_NAME })
    expect(res && res.body && typeof res.body === 'object');
  })
})

describe('network route endpoint', () => {
  test('should return success msg', async () => {
    const res = await supertest(app)
      .get('/api/larch/network/')
      .query({ networkName: '' })
    expect(res && res.body && typeof res.body === 'object')
    expect(res.statusCode).toBeGreaterThanOrEqual(400)
  })
})
 // Test Cases Test Network API

 describe('Test Network route endpoint', () => {
  test('Zombienet network test', async () => {
    const res = await supertest(app)
      .post('/api/larch/network/test/')
      .send({
        "name": TEST_NETWORK_NAME,
        "configFilename": FILE_NAME,
        "configContent": CONFIG_FILE,
        "networkDirectory": DIRECTORY_NAME,
        "networkProvider": NETWORK_PROVIDER,
        "testFilename": TEST_FILE_NAME,
        "testContent": TEST_FILE_CONTENT,

      })
      expect(res.statusCode).toBeGreaterThanOrEqual(200);
  })
})

  // Update Network API

  describe('Update Network Endpoint', () => {
    test('it should return success message and status code should be equal to 200', async () => {
      const res = await supertest(app)
        .post('/api/larch/network/update/')
        .query({ networkName: NETWORK_NAME })
        .send({
          "testFilename": TEST_FILE_NAME,
          "testContent": TEST_FILE_CONTENT,
          "configFilename": FILE_NAME,
          "configContent": CONFIG_FILE,
  
        })
      expect(res.statusCode).toEqual(400)
      // expect(res.body.success).toEqual(true);
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



// Network Run API

describe('Test Network Run endpoint', () => {
  test('it should return error message and status code should be equal to 404', async () => {
    const runId = '';
    const res = await supertest(app)
      .get('/api/larch/network/run/')
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

// Network Run-List

describe('Test Network Run-List endpoint', () => {
  test('it should return error message and status code should be equal to 404', async () => {
    const runId = '';
    const res = await supertest(app)
      .post('/api/larch/network/run-list/')
      .send({
        "filter": {
          "id": "",
          "intention":"NETWORK_CREATE",
          "command":""
        },
        "meta": {
          "pageNum": 1,
          "numOfRec": 2
        }
      })
        expect(res && res.body && typeof res.body === 'object')
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
        expect(res.statusCode).toBeGreaterThanOrEqual(400)
        expect(res.body.success).toEqual(false)
        expect(res.body.error.type).toEqual('VALIDATION_ERROR');
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
         expect(res.body.success).toEqual(false);
        
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
    expect(res && res.body && typeof res.body === 'object')
    expect(res.body.success === 'true')
    expect(res.body).not.toEqual({ })
    expect(typeof res.body.meta.pageNum === 'number' && typeof res.body.meta.numOfRec === 'number' && typeof res.body.meta.total === 'number')
    })
  })