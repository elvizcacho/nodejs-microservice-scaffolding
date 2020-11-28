import { TextColor } from '@core/enums'
import { ApplicationLogger, LoggerConfig } from '@core/logger'

export const BaseLoggerConfig: LoggerConfig = {
  appLabel: 'FREELANCER_SERVICE',
  appLabelTextColor: TextColor.FG_CYAN,
  appLabelBackgroundColor: TextColor.BG_YELLOW,
}

export const HTTPLoggerConfig: LoggerConfig = {
  ...BaseLoggerConfig,
  classLabel: 'EXPRESS',
  classLabelTextColor: TextColor.FG_RED,
  classLabelBackgroundColor: TextColor.BG_WHITE,
}

export const AppLogger = new ApplicationLogger(BaseLoggerConfig)
