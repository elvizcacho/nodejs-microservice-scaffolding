import { Application } from 'express';
import routes from '@public/routes';

export default (app: Application): void => routes(app);
