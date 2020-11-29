import { check } from 'express-validator';
import { errorMsg } from '@core/validator';

export default {
  login: [
    check('email').isEmail(),
    check('password').isLength({ min: 5 }),
    errorMsg,
  ],
};
