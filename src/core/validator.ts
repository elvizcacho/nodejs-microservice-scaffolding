import { Response, NextFunction } from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { ErrorResponse } from '@core/Error';
import {RequestWithToken} from '@core/middlewares'

const sanitizeError = (error: ValidationError) => new ErrorResponse(error.value || '', error.msg || '', error.param || '', error.location || '').toJSON();

export const errorMsg = (req: RequestWithToken, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array().map(sanitizeError) });
  } else {
    next();
  }
};
