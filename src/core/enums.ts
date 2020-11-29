export const getEnumKeys = (E: Record<string, string>): string[] =>
  Object.keys(E);
export const getEnumValues = (E: Record<string, string>): string[] =>
  getEnumKeys(E).map((k) => E[k]);

export enum Errors {
  CREDENTIALS_INCORRECT = 'CREDENTIALS_INCORRECT',
  WRONG_INPUT_DATA = 'WRONG_INPUT_DATA',
  MISSING_TOKEN = 'MISSING_TOKEN',
  INVALID_TOKEN = 'INVALID_TOKEN',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NOT_FOUND = 'NOT_FOUND',
}

export enum ErrorLocation {
  BODY = 'body',
  HEADER = 'header',
}

export enum TextColor {
  FG_BLACK = '\u001B[30m',
  FG_RED = '\u001B[31m',
  FG_GREEN = '\u001B[32m',
  FG_YELLOW = '\u001B[33m',
  FG_BLUE = '\u001B[34m',
  FG_MAGENTA = '\u001B[35m',
  FG_CYAN = '\u001B[36m',
  FG_WHITE = '\u001B[37m',
  BG_BLACK = '\u001B[40m',
  BG_RED = '\u001B[41m',
  BG_GREEN = '\u001B[42m',
  BG_YELLOW = '\u001B[43m',
  BG_BLUE = '\u001B[44m',
  BG_MAGENTA = '\u001B[45m',
  BG_CYAN = '\u001B[46m',
  BG_WHITE = '\u001B[47m',
  RESET = '\u001B[0m',
  BRIGHT = '\u001B[1m',
  DIM = '\u001B[2m',
  UNDERSCORE = '\u001B[4m',
  BLINK = '\u001B[5m',
  REVERSE = '\u001B[7m',
  HIDDEN = '\u001B[8m',
}
