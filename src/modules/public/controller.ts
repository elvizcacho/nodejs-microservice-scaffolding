import express from 'express';
import service from '@public/service';
import { withErrorHandling } from '@core/decorators';

class Controller {
  @withErrorHandling()
  async home(_req: express.Request, res: express.Response) {
    const response = await service.home();
    res.send(response);
  }
}

export default new Controller();
