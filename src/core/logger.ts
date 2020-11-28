import {TextColor} from '@core/enums'


export interface LoggerConfig {
    appLabel: string,
    appLabelTextColor: TextColor,
    appLabelBackgroundColor: TextColor,
    classLabel?: string
    classLabelTextColor?: TextColor,
    classLabelBackgroundColor?: TextColor,
}

export class ApplicationLogger {

    private config: LoggerConfig;

    constructor(config: LoggerConfig) {
        this.config = config;
    }

    getAppLabel(): string {
        return this.config.appLabel ? `${this.config.appLabelTextColor}${this.config.appLabel}${TextColor.RESET}` : ''
    }

    getClassLabel(): string {
        return this.config.classLabel ? `${this.config.classLabelTextColor}${this.config.classLabel}${TextColor.RESET}` : ''
    }

    getLogMessage(msg: string): string {
        return `${this.getAppLabel()} ${this.getClassLabel()} ${msg}`
    }

    log(msg: string): void {
        console.log(this.getLogMessage(msg))
    }

    error(msg: string): void {
        console.error(this.getLogMessage(msg))
    }

    info(msg: string): void {
        console.info(this.getLogMessage(msg))
    }
}
