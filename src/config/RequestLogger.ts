import morgan from 'morgan'
import {ApplicationLogger} from '@core/logger'
import {HTTPLoggerConfig} from '@config/ApplicationLogger'
import {Handler} from 'express'


export interface RequestLoggerConfig {
    enabled: boolean
}

export class RequestLogger {

    private config: RequestLoggerConfig;
    private logger = new ApplicationLogger(HTTPLoggerConfig);

    constructor(config: RequestLoggerConfig) {
        this.config = config;
    }

    apply(): Handler {
        if (this.config.enabled) {
            const logFormat = this.logger.getLogMessage(':method :url :status - :response-time ms')
            return morgan(logFormat)
        }
    }
}
