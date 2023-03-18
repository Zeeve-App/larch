import { test, expect, describe } from 'vitest'
import supertest from 'supertest';
import app from '../src/index';

describe('Network route endpoint', () => {
  test('should return all the networks', async () => {
    const res = await supertest(app)
      .get('/api/larch/networks')
    // expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({
      "message": "success from network api"
  })
  })
})

describe('Create Network Endpoint', () => {
    test('should return an object with the network-name,directory-name,file-name and configuration-file', async () => {
      const res = await supertest(app)
        .post('/api/larch/networks/create')
        .send({
          "dirName":"my-zombienet",
          "fileName":"small-network.json",
          "NetworkName":"A Simple Test Network",
          "confFile":"ewogICJyZWxheWNoYWluIjogewogICAgImRlZmF1bHRfaW1hZ2UiOiAiZG9ja2VyLmlvL3Bhcml0eXByL3BvbGthZG90LWRlYnVnOm1hc3RlciIsCiAgICAiZGVmYXVsdF9jb21tYW5kIjogInBvbGthZG90IiwKICAgICJkZWZhdWx0X2FyZ3MiOiBbCiAgICAgICItbHBhcmFjaGFpbj1kZWJ1ZyIKICAgIF0sCiAgICAiY2hhaW4iOiAicm9jb2NvLWxvY2FsIiwKICAgICJub2RlcyI6IFsKICAgICAgewogICAgICAgICJuYW1lIjogImFsaWNlIiwKICAgICAgICAidmFsaWRhdG9yIjogdHJ1ZQogICAgICB9LAogICAgICB7CiAgICAgICAgIm5hbWUiOiAiYm9iIiwKICAgICAgICAiaW1hZ2UiOiAiZG9ja2VyLmlvL3Bhcml0eXByL3BvbGthZG90LWRlYnVnOjUyMzYtMC45LjE4LWM1NTY2MGU5LWJlMTZiZDcyIiwKICAgICAgICAidmFsaWRhdG9yIjogdHJ1ZSwKICAgICAgICAiYXJncyI6IFsKICAgICAgICAgICItLWRhdGFiYXNlPXBhcml0eWRiLWV4cGVyaW1lbnRhbCIKICAgICAgICBdCiAgICAgIH0KICAgIF0KICB9Cn0="
      })
      // expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual({
        "message": "Uploaded successfully",
        "directoryName": "my-zombienet",
        "fileName": "small-network.json",
        "networkName": "A Simple Test Network",
        "networkConfiguration": "ewogICJyZWxheWNoYWluIjogewogICAgImRlZmF1bHRfaW1hZ2UiOiAiZG9ja2VyLmlvL3Bhcml0eXByL3BvbGthZG90LWRlYnVnOm1hc3RlciIsCiAgICAiZGVmYXVsdF9jb21tYW5kIjogInBvbGthZG90IiwKICAgICJkZWZhdWx0X2FyZ3MiOiBbCiAgICAgICItbHBhcmFjaGFpbj1kZWJ1ZyIKICAgIF0sCiAgICAiY2hhaW4iOiAicm9jb2NvLWxvY2FsIiwKICAgICJub2RlcyI6IFsKICAgICAgewogICAgICAgICJuYW1lIjogImFsaWNlIiwKICAgICAgICAidmFsaWRhdG9yIjogdHJ1ZQogICAgICB9LAogICAgICB7CiAgICAgICAgIm5hbWUiOiAiYm9iIiwKICAgICAgICAiaW1hZ2UiOiAiZG9ja2VyLmlvL3Bhcml0eXByL3BvbGthZG90LWRlYnVnOjUyMzYtMC45LjE4LWM1NTY2MGU5LWJlMTZiZDcyIiwKICAgICAgICAidmFsaWRhdG9yIjogdHJ1ZSwKICAgICAgICAiYXJncyI6IFsKICAgICAgICAgICItLWRhdGFiYXNlPXBhcml0eWRiLWV4cGVyaW1lbnRhbCIKICAgICAgICBdCiAgICAgIH0KICAgIF0KICB9Cn0="
    })
    })
  })

  describe('Create Network Endpoint', () => {
    test('should return error', async () => {
      const res = await supertest(app)
        .post('/api/larch/networks/create')
        .send({
          "fileName":"small-network.json",
          "NetworkName":"A Simple Test Network",
          "confFile":"ewogICJyZWxheWNoYWluIjogewogICAgImRlZmF1bHRfaW1hZ2UiOiAiZG9ja2VyLmlvL3Bhcml0eXByL3BvbGthZG90LWRlYnVnOm1hc3RlciIsCiAgICAiZGVmYXVsdF9jb21tYW5kIjogInBvbGthZG90IiwKICAgICJkZWZhdWx0X2FyZ3MiOiBbCiAgICAgICItbHBhcmFjaGFpbj1kZWJ1ZyIKICAgIF0sCiAgICAiY2hhaW4iOiAicm9jb2NvLWxvY2FsIiwKICAgICJub2RlcyI6IFsKICAgICAgewogICAgICAgICJuYW1lIjogImFsaWNlIiwKICAgICAgICAidmFsaWRhdG9yIjogdHJ1ZQogICAgICB9LAogICAgICB7CiAgICAgICAgIm5hbWUiOiAiYm9iIiwKICAgICAgICAiaW1hZ2UiOiAiZG9ja2VyLmlvL3Bhcml0eXByL3BvbGthZG90LWRlYnVnOjUyMzYtMC45LjE4LWM1NTY2MGU5LWJlMTZiZDcyIiwKICAgICAgICAidmFsaWRhdG9yIjogdHJ1ZSwKICAgICAgICAiYXJncyI6IFsKICAgICAgICAgICItLWRhdGFiYXNlPXBhcml0eWRiLWV4cGVyaW1lbnRhbCIKICAgICAgICBdCiAgICAgIH0KICAgIF0KICB9Cn0="
      })
      // expect(res.statusCode).toEqual(200)
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
          "dirName":"my-zombienet",
          "NetworkName":"A Simple Test Network",
          "confFile":"ewogICJyZWxheWNoYWluIjogewogICAgImRlZmF1bHRfaW1hZ2UiOiAiZG9ja2VyLmlvL3Bhcml0eXByL3BvbGthZG90LWRlYnVnOm1hc3RlciIsCiAgICAiZGVmYXVsdF9jb21tYW5kIjogInBvbGthZG90IiwKICAgICJkZWZhdWx0X2FyZ3MiOiBbCiAgICAgICItbHBhcmFjaGFpbj1kZWJ1ZyIKICAgIF0sCiAgICAiY2hhaW4iOiAicm9jb2NvLWxvY2FsIiwKICAgICJub2RlcyI6IFsKICAgICAgewogICAgICAgICJuYW1lIjogImFsaWNlIiwKICAgICAgICAidmFsaWRhdG9yIjogdHJ1ZQogICAgICB9LAogICAgICB7CiAgICAgICAgIm5hbWUiOiAiYm9iIiwKICAgICAgICAiaW1hZ2UiOiAiZG9ja2VyLmlvL3Bhcml0eXByL3BvbGthZG90LWRlYnVnOjUyMzYtMC45LjE4LWM1NTY2MGU5LWJlMTZiZDcyIiwKICAgICAgICAidmFsaWRhdG9yIjogdHJ1ZSwKICAgICAgICAiYXJncyI6IFsKICAgICAgICAgICItLWRhdGFiYXNlPXBhcml0eWRiLWV4cGVyaW1lbnRhbCIKICAgICAgICBdCiAgICAgIH0KICAgIF0KICB9Cn0="
      })
      // expect(res.statusCode).toEqual(200)
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
          "dirName":"my-zombienet",
          "fileName":"small-network.json",
          "confFile":"ewogICJyZWxheWNoYWluIjogewogICAgImRlZmF1bHRfaW1hZ2UiOiAiZG9ja2VyLmlvL3Bhcml0eXByL3BvbGthZG90LWRlYnVnOm1hc3RlciIsCiAgICAiZGVmYXVsdF9jb21tYW5kIjogInBvbGthZG90IiwKICAgICJkZWZhdWx0X2FyZ3MiOiBbCiAgICAgICItbHBhcmFjaGFpbj1kZWJ1ZyIKICAgIF0sCiAgICAiY2hhaW4iOiAicm9jb2NvLWxvY2FsIiwKICAgICJub2RlcyI6IFsKICAgICAgewogICAgICAgICJuYW1lIjogImFsaWNlIiwKICAgICAgICAidmFsaWRhdG9yIjogdHJ1ZQogICAgICB9LAogICAgICB7CiAgICAgICAgIm5hbWUiOiAiYm9iIiwKICAgICAgICAiaW1hZ2UiOiAiZG9ja2VyLmlvL3Bhcml0eXByL3BvbGthZG90LWRlYnVnOjUyMzYtMC45LjE4LWM1NTY2MGU5LWJlMTZiZDcyIiwKICAgICAgICAidmFsaWRhdG9yIjogdHJ1ZSwKICAgICAgICAiYXJncyI6IFsKICAgICAgICAgICItLWRhdGFiYXNlPXBhcml0eWRiLWV4cGVyaW1lbnRhbCIKICAgICAgICBdCiAgICAgIH0KICAgIF0KICB9Cn0="
      })
      // expect(res.statusCode).toEqual(200)
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
          "dirName":"my-zombienet",
          "fileName":"small-network.json",
          "NetworkName":"A Simple Test Network",
      })
      // expect(res.statusCode).toEqual(200)
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
      // expect(res.statusCode).toEqual(200)
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
      // expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual({
        "msg":"Empty values are not allowed"
    })
    })
  })



  describe('Version route endpoint', () => {
    test('should return the current version of the application', async () => {
      const res = await supertest(app)
        .get('/api/larch/version')
      // expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual({
        "message": "success from version api"
    })
    })
  })

  describe('Health route endpoint', () => {
    test('should return success msg', async () => {
      const res = await supertest(app)
        .get('/healthz')
      // expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual({
        "message": "success from health api"
    })
    })
  })

  describe('Progress route endpoint', () => {
    test('should return success msg', async () => {
      const res = await supertest(app)
        .get('/api/larch/progress')
      // expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual({
        "message": "success from progress api"
    })
    })
  })
