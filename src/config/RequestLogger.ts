import morgan from 'morgan';
import { ApplicationLogger } from '@core/logger';
import { HTTPLoggerConfig } from '@config/ApplicationLogger';
import { Handler } from 'express';

export class RequestLogger {
  private logger = new ApplicationLogger(HTTPLoggerConfig);

  apply(): Handler {
    const logFormat = this.logger.getLogMessage(
      ':method :url :status - :response-time ms',
    );
    return morgan(logFormat);
  }
}
