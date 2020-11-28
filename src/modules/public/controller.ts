import express from 'express';
import { errorToResponse } from '@core/Error';
import { AppLogger } from '@config/ApplicationLogger';
import service from '@public/service';
import { ErrorLocation } from '@core/enums';

class Controller {
  home(_req: express.Request, res: express.Response) {
    res.send('OK');
  }

  homeV200(_req: express.Request, res: express.Response) {
    res.send('OK-V2');
  }

  async login(req: express.Request, res: express.Response) {
    try {
      const { email, password } = req.body;

      const response = await service.loginUser(email, password);

      return res.send(response);
    } catch (e) {
      AppLogger.error(`Error at login => Error: ${e}`);
      const { errorsResponse, code } = errorToResponse(e);
      // special case for login route only
      if (code === 401) {
        errorsResponse.errors[0].msg = 'CREDENTIALS_INCORRECT';
        errorsResponse.errors[0].location = ErrorLocation.BODY;
        errorsResponse.errors[0].param = '';
        errorsResponse.errors[0].value = '';
      }

      return res.status(code).send(errorsResponse);
    }
  }
}

export default new Controller();
