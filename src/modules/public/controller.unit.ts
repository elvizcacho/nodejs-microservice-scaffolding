import controller from '@public/controller';
import { Response, Request } from 'express';
import service from '@public/service';
import Mock = jest.Mock;

jest.mock('@public/service');

describe('public controller', () => {
  describe('home', () => {
    it('should return OK and status 200 for home action v1.0.0', async () => {
      const res: Partial<Response> = {
        send: jest.fn(),
      };
      (service.home as Mock).mockResolvedValue({ ok: 'ok' });
      await controller.home({} as Request, res as Response);
      expect(res.send).toHaveBeenCalledWith({ ok: 'ok' });
    });
  });
});
