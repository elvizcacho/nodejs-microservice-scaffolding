import {from} from 'env-var'
import {AppLogger} from '@config/ApplicationLogger'

const logger = (varname: string, str: string): void => AppLogger.log(`${varname}: ${str}`)

const env = from(process.env, {}, logger)

export const PORT: number = env.get('PORT').default(6000).asIntPositive();
export const NODE_ENV: 'development' | 'production' = env.get('NODE_ENV').default('development').asEnum(['development', 'production'])
