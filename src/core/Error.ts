import { ErrorLocation, Errors } from '@core/enums'

export interface ApplicationError extends Error {
  name: string
  code: TStatusCode
  message: string
  stack?: string
}

/**
 * An error which is thrown if an invalid operation occurred.
 */
export class InvalidOperationError extends Error implements ApplicationError {
  constructor(
    message: string,
    origin?: string,
    public code: TStatusCode = 400,
  ) {
    super(`[${origin ? origin.toUpperCase() : 'UNKNOWN'}] => ${message}`)

    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    this.name = InvalidOperationError.name // stack traces are displayed correctly
  }
}

export interface IErrorResponse {
  value: string
  msg: string
  param: string
  location: string
}

export class ErrorResponse implements IErrorResponse {
  location: string
  msg: string | Errors
  param: string
  value: string

  constructor(value: string, msg: string, param: string, location: string) {
    this.value = value
    this.msg = msg
    this.param = param
    this.location = location
  }

  toJSON(): IErrorResponse {
    return {
      value: this.value,
      msg: this.msg,
      param: this.param,
      location: this.location,
    }
  }
}

const getErrorResponseByStatusCode = (code: number, token?: TokenString) => {
  switch (code) {
    case 401:
      return new ErrorResponse(
        token,
        Errors.INVALID_TOKEN,
        'authorization',
        ErrorLocation.HEADER,
      )
    case 404:
      return new ErrorResponse('', Errors.NOT_FOUND, '', '')
    case 500:
      return new ErrorResponse('', Errors.INTERNAL_SERVER_ERROR, '', '')
    case 503:
      return new ErrorResponse('', Errors.SERVICE_UNAVAILABLE, '', '')
    default:
      return new ErrorResponse(
        '',
        Errors.WRONG_INPUT_DATA,
        '',
        ErrorLocation.BODY,
      )
  }
}

export const errorToResponse = (
  e: InvalidOperationError,
  token?: string,
): { errorsResponse: ErrorsResponse; code: number } => {
  let code = e.code === 'ECONNREFUSED' ? 503 : e.code
  if (!(e instanceof InvalidOperationError || code === 503)) {
    code = 500
  }
  const error = getErrorResponseByStatusCode(code, token)
  return { errorsResponse: { errors: [error.toJSON()] }, code }
}

export interface ErrorsResponse {
  errors: IErrorResponse[]
}
