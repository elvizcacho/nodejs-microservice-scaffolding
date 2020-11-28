import express, { Express } from 'express';
import swaggerUI from 'swagger-ui-express';
import { NODE_ENV, PORT } from '@config/config';
import modules, { Module } from '@modules';
import http from 'http';
import { HTTPLoggerConfig } from '@config/ApplicationLogger';
import documentation from '@documentation/API-1.0.0-swagger.yaml';
import {ApplicationLogger} from '@core/logger'
import {RequestLogger} from '@config/RequestLogger'

class ExpressServer {
  private logger: ApplicationLogger;
  private reqLogger: RequestLogger;

  private readonly express: Express;
  private readonly port: number;

  public http!: http.Server;

  private connections: NodeJS.Socket[] = [];

  public constructor() {
    this.port = PORT;
    this.logger = new ApplicationLogger(HTTPLoggerConfig);
    this.reqLogger = new RequestLogger({
      enabled: NODE_ENV === 'development',
    });
    this.express = express();
    this.express.use((req, res, next) => {
      console.log(req, res)
      next()
    })
    this.express.disable('x-powered-by');
    this.express.use(this.reqLogger.apply());
  }

  public startServer() {
    this.http = this.express.listen(this.port, () => {
      this.logger.info(` http server started on http://0.0.0.0:${this.port}`);
    });

    this.http.on('connection', (listener) => {
      console.log('WHATTTT!!')
      this.connections.push(listener);
      listener.on('close', () => (this.connections = this.connections.filter((current) => current !== listener)));
    });
  }

  public stopServer() {
    if (this.http !== undefined) {
      this.logger.info('Shutting down HTTP infrastructure');
      this.http.close((error: Error) => {
        if (error !== undefined) this.logger.error(error.message);
      });
      this.connections.forEach((current) => current.end());
    }
  }

  public loadModule(module: Module) {
    module(this.express);
  }

  public loadModules() {
    for (const module of modules) {
      this.loadModule(module);
    }
  }

  public loadDocumentation() {
    this.express.use('/api-docs', swaggerUI.serve, swaggerUI.setup(documentation));
    this.express.get('/api-docs.json', (_req: express.Request, res: express.Response) => res.send(documentation));
  }
}

export default new ExpressServer();
