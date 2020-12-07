import { from } from 'env-var';
import { AppLogger } from '@config/ApplicationLogger';

const logger = (varname: string, str: string): void =>
  AppLogger.log(`${varname}: ${str}`);

const env = from(process.env, {}, logger);

export const NODE_ENV: 'development' | 'production' = env
  .get('NODE_ENV')
  .default('development')
  .asEnum(['development', 'production']);
export const PORT: number = env.get('PORT').default(8082).asIntPositive();
export const PG_HOST: string = env
  .get('PG_HOST')
  .default('localhost')
  .asString();
export const PG_USER: string = env.get('PG_USER').default('app').asString();
export const PG_PASSWORD: string = env
  .get('PG_PASSWORD')
  .default('password')
  .asString();
export const PG_DB: string = env
  .get('PG_DB')
  .default('freelancer_service')
  .asString();
export const PG_DEBUG: boolean = env.get('PG_DEBUG').default('true').asBool();
