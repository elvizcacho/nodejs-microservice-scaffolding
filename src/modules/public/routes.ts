import { Application, Router } from 'express';
import controller from '@public/controller';

export default (app: Application): void => {
  // Routes: v1.0.0
  const routerV100 = Router();

  routerV100.get('/', controller.home);

  app.use('/v1.0.0', routerV100);

  // Routes: v2.0.0
  /*const routerV200 = Router();
  routerV200.get('/', controller.homeV200);
  app.use('/v2.0.0', routerV200);*/
};
