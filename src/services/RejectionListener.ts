import { TextColor } from '@core/enums'

process.on('unhandledRejection', (reason) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(
      `${TextColor.BG_RED}${
        TextColor.FG_WHITE
      }[${new Date().toISOString()}] [CRIT]  [UNHANDLED_REJECTION]\t${reason}${
        TextColor.RESET
      }`,
    )
  } else {
    console.error({
      time: new Date().toISOString(),
      level: 'critical',
      message: reason,
      label: 'UNHANDLED_REJECTION',
    })
  }

  process.exit(1)
})
