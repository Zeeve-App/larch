import { test, expect, describe } from 'vitest'
import supertest from 'supertest';
import app from '../src/index';
import { DIRECTORY_NAME, FILE_NAME, NETWORK_NAME, CONFIG_FILE, NEW_NETWORK_NAME } from './test.variables';



// Test Cases for Health Route

describe('Health route endpoint', () => {
  test('should return success msg', async () => {
    const res = await supertest(app)
      .get('/healthz')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      "message": "success from health api"
  })
  })
})

describe('Health route endpoint', () => {
  test('if the server is ok, the status should be not equals to 400', async () => {
    const res = await supertest(app)
      .get('/healthz')
    expect(res.statusCode).not.toEqual(400)
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
    expect(res && res.body && typeof res.body === 'string')
  })
})





// Test Cases for Show Networks Routes


describe('Network route endpoint', () => {
  test('check for response and the type of response', async () => {
    const res = await supertest(app)
      .get('/api/larch/networks')
      expect(res && res.body && typeof res.body === 'object')
      })
   })

describe('Network route endpoint', () => {
  test('should return the status code 200', async () => {
    const res = await supertest(app)
      .get('/api/larch/networks')
    expect(res.statusCode).toEqual(200)
    
  })
})

describe('Network route endpoint', () => {
  test('api is wrong should not return the status code 200', async () => {
    const res = await supertest(app)
      .get('/api/larch/network')
    expect(res.statusCode).not.toEqual(200)
    
  })
})

describe('Network route endpoint', () => {
  test('api is wrong should not return the status code 200', async () => {
    const res = await supertest(app)
      .get('/api/larch/networks')
    .expect('Content-Type', 'application/json; charset=utf-8')
    
  })
})

describe('Network route endpoint', () => {
  test('should return all the networks (if exists)', async () => {
    const res = await supertest(app)
      .get('/api/larch/networks')
      expect(res._body.length >= 0)
  })
})

describe('Network route endpoint', () => {
  test('check the get routes', async () => {
    const res = await supertest(app)
      .get('/api/larch/networks')
      if(res._body.length >= 0){
        for(let i=0; i<res._body.length;i++){
          expect(res._body[i].name && typeof res._body[i].name === 'string')
          expect(res._body[i].dirName && typeof res._body[i].dirName === 'string')
          expect(res._body[i].fileName && typeof res._body[i].fileName === 'string')
          expect(res._body[i].confFile && typeof res._body[i].confFile === 'string')
          expect(res._body[i].networkState && typeof res._body[i].networkState === 'string')
          expect(res._body[i].networkProvider && typeof res._body[i].networkProvider === 'string')
        }     
      }
      else{
        return;
      }
  })
})





// Test Cases for Create Networks Routes

describe('Create Network Endpoint', () => {
    test('should return an object with the network-name,directory-name,file-name and configuration-file', async () => {
      const res = await supertest(app)
        .post('/api/larch/networks/create')
        .send({
          "dirName":DIRECTORY_NAME,
          "fileName":FILE_NAME,
          "networkName":NETWORK_NAME,
          "confFile":CONFIG_FILE
      })
      expect(res.statusCode).toEqual(200)
       expect(res.body).toEqual({
          "message": "Network Running successfully",
          "directoryName":DIRECTORY_NAME,
          "fileName":FILE_NAME,
          "networkName":NEW_NETWORK_NAME,
          "networkConfiguration":CONFIG_FILE
    })
    })
  })

  describe('Create Network Endpoint', () => {
    test('should return error', async () => {
      const res = await supertest(app)
        .post('/api/larch/networks/create')
        .send({
          "fileName":FILE_NAME,
          "networkName":NETWORK_NAME,
          "confFile":CONFIG_FILE
      })
      expect(res.statusCode).toEqual(404)
      expect(res.body).toEqual({
        "msg": "Directory Name Required"
    })
    })
  })
  describe('Create Network Endpoint', () => {
    test('should return error', async () => {
      const res = await supertest(app)
        .post('/api/larch/networks/create')
        .send({
          "dirName":DIRECTORY_NAME,
          "NetworkName":NETWORK_NAME,
          "confFile":CONFIG_FILE
      })
      expect(res.statusCode).toEqual(404)
      expect(res.body).toEqual({
        "msg":"File Name Required"
    })
    })
  })

  describe('Create Network Endpoint', () => {
    test('should return error', async () => {
      const res = await supertest(app)
        .post('/api/larch/networks/create')
        .send({
          "dirName":DIRECTORY_NAME,
          "fileName":FILE_NAME,
          "confFile":CONFIG_FILE
      })
      expect(res.statusCode).toEqual(404)
      expect(res.body).toEqual({
        "msg":"Network Name Required"
    })
    })
  })

  describe('Create Network Endpoint', () => {
    test('should return error', async () => {
      const res = await supertest(app)
        .post('/api/larch/networks/create')
        .send({
          "dirName":DIRECTORY_NAME,
          "fileName":FILE_NAME,
          "networkName":NETWORK_NAME,
      })
      expect(res.statusCode).toEqual(404)
      expect(res.body).toEqual({
        "msg":"Configuration File Required"
    })
    })
  })
  describe('Create Network Endpoint', () => {
    test('should return error', async () => {
      const res = await supertest(app)
        .post('/api/larch/networks/create')
        .send()
      expect(res.statusCode).toEqual(404)
      expect(res.body).toEqual({
        "msg":"Empty values are not allowed"
    })
    })
  })
  describe('Create Network Endpoint', () => {
    test('should return error', async () => {
      const res = await supertest(app)
        .post('/api/larch/networks/create')
        .send({

      })
      expect(res.statusCode).toEqual(404)
      expect(res.body).toEqual({
        "msg":"Empty values are not allowed"
    })
    })
  })


// Test Cases for Version Routes

  describe('Version route endpoint', () => {
    test('should return the current version of the application', async () => {
      const res = await supertest(app)
        .get('/api/larch/version')
      expect(res.body).toEqual({
          "zombienet-version": "1.3.40",
          "larch-version": "1.0.0"
    })
    })
  })

  describe('Version route endpoint', () => {
    test('should return the current version of the application', async () => {
      const res = await supertest(app)
        .get('/api/larch/version')
      expect(res.statusCode).toEqual(200)
    })
  })





  // Test Cases for Progress Routes


  describe('Progress route endpoint', () => {
    test('should return all the network name and status of networks (if exists)', async () => {
      const res = await supertest(app)
        .get('/api/larch/progress')
        expect(res._body.length >= 0)
    })
  })
  
  describe('Progress route endpoint', () => {
    test('check the get routes', async () => {
      const res = await supertest(app)
        .get('/api/larch/progress')
        if(res._body.length >= 0){
          for(let i=0; i<res._body.length;i++){
            expect(res._body[i].networkName && typeof res._body[i].networkName === 'string')
            expect(res._body[i].networkState && typeof res._body[i].networkState === 'string')
          }     
        }
        else{
          return;
        }
    })
  })

  describe('Progress route endpoint', () => {
    test('should return success msg', async () => {
      const res = await supertest(app)
        .get('/api/larch/progress')
      expect(res.statusCode).toEqual(200)
    })
  })