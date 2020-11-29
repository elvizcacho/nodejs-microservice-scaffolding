import { getToken, RequestWithToken } from '@core/middlewares';
import { NextFunction, Response } from 'express';

describe('middlewares', () => {
  it('should get token from auth header', (done) => {
    const req: Partial<RequestWithToken> = {
      headers: {
        authorization: 'Bearer abc',
      },
    };

    const next: NextFunction = () => {
      const { token } = req;
      expect(token).toBe('abc');
      done();
    };

    getToken(req as RequestWithToken, {} as Response, next);
  });
});
