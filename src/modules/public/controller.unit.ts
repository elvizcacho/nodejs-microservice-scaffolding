import controller from '@public/controller';
import { Response, Request } from 'express';

jest.mock('@public/service');

describe('public controller', async () => {
  describe('home', () => {
    it('should return OK and status 200 for home action v1.0.0', () => {
      const res: Partial<Response> = {
        send: jest.fn(),
      };
      controller.home({} as Request, res as Response);
      expect(res.send).toBeCalledWith({ ok: 'ok' });
    });
  });
});
