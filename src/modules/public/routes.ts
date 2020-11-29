import { Application, Router, json } from 'express';
import controller from '@public/controller';
import validator from '@public/validator';

export default (app: Application): void => {
  // Routes: v1.0.0
  const routerV100 = Router();
  routerV100.get('/', controller.home);
  routerV100.post('/login', json(), validator.login, controller.login);
  app.use('/v1.0.0', routerV100);

  // Routes: v2.0.0
  const routerV200 = Router();
  routerV200.get('/', controller.homeV200);
  app.use('/v2.0.0', routerV200);
};
