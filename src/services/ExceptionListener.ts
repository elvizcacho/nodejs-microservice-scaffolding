import { TextColor } from '@core/enums';

process.on('uncaughtException', (err: Error) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(
      `${TextColor.BG_RED}${
        TextColor.FG_WHITE
      }[${new Date().toISOString()}] [CRIT]  [UNHANDLED_EXCEPTION]\t${
        err.stack || err
      }${TextColor.RESET}`,
    );
  } else {
    console.error({
      time: new Date().toISOString(),
      level: 'critical',
      message: err,
      label: 'UNHANDLED_EXCEPTION',
    });
  }

  process.exit(1);
});
