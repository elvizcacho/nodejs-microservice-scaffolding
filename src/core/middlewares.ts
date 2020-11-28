import { NextFunction, Request, Response } from 'express'
import { ErrorResponse } from '@core/Error'
import { ErrorLocation, Errors } from '@core/enums'

export interface RequestWithToken extends Request {
  token: string
}

export const getToken = (
  req: RequestWithToken,
  res: Response,
  next: NextFunction,
): void => {
  if (req.headers.authorization?.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1]
    req.token = token

    return next()
  }

  res.status(401).send({
    errors: [
      new ErrorResponse(
        '',
        Errors.MISSING_TOKEN,
        'authorization',
        ErrorLocation.HEADER,
      ),
    ],
  })
}
