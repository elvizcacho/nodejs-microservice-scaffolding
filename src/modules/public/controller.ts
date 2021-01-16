import express from 'express';

class Controller {
  home(_req: express.Request, res: express.Response) {
    res.send('OK');
  }
}

export default new Controller();
