import { getToken, RequestWithToken } from '@core/middlewares';
import { NextFunction, Response } from 'express';

describe('middlewares', () => {
  it('should get token from auth header', (done) => {
    const req = {
      headers: {
        authorization: 'Bearer abc',
      },
    } as RequestWithToken;

    const next: NextFunction = () => {
      const { token } = req;
      expect(token).toBe('abc');
      done();
    };

    getToken(req, {} as Response, next);
  });
});
