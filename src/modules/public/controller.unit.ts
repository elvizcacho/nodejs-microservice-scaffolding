import controller from '@public/controller';
import { Response, Request } from 'express';

jest.mock('@public/service');

describe('public controller', async () => {
  describe('home', () => {
    it('should return OK and status 200 for home action v100', () => {
      const res: Partial<Response> = {
        send: jest.fn(),
      };
      controller.home({} as Request, res as Response);
      expect(res.send).toBeCalledWith('OK');
    });

    it('should return OK and status 200 for home action v200', () => {
      const res: Partial<Response> = {
        send: jest.fn(),
      };
      controller.homeV200({} as Request, res as Response);
      expect(res.send).toBeCalledWith('OK-V2');
    });
  });

  describe('login', () => {
  });
});
