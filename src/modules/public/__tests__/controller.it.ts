import request from 'supertest';
import expressServer from '@infra/http/ExpressServer';
import Public from '@public';
import { Module } from '@modules';
import * as http from 'http';

describe('public', () => {
  let server: http.Server;

  beforeAll(() => {
    expressServer.startServer();
    expressServer.loadModule(Public as Module);
    server = expressServer.http;
  });

  afterEach(() => {
    server.close();
  });

  it('responds status code 200 and ok for /v1.0.0', (done) => {
    request(server).get('/v1.0.0/').expect(200).expect('OK').end(done);
  });

  it('responds status code 200 and ok for /v2.0.0', (done) => {
    request(server).get('/v2.0.0/').expect(200).expect('OK-V2').end(done);
  });

  describe('/login', () => {});
});
