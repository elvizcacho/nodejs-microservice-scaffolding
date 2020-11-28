import expressServer from '@infra/http/ExpressServer'
import * as http from 'http'
import request from 'supertest'

describe('documentation', () => {
  let server: http.Server

  beforeAll(() => {
    expressServer.startServer()
    expressServer.loadModules()
    expressServer.loadDocumentation()
    server = expressServer.http
  })

  afterEach(() => {
    expressServer.stopServer()
  })

  it('should return 200 and render documentation', (done) => {
    request(server).get('/api-docs/').expect(200).end(done)
  })

  it('should return 200 and render documentation in json', (done) => {
    request(server)
      .get('/api-docs.json')
      .expect(200)
      .expect((res) => expect(res.body.openapi).toBe('3.0.0'))
      .end(done)
  })
})
