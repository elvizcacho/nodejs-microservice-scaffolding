import { RequestWithToken } from '@core/middlewares'
import { Response } from 'express'
import { AppLogger } from '@config/ApplicationLogger'
import { errorToResponse } from '@core/Error'

type DecoratorFactory<T> = (
  _target: T,
  _key: string,
  descriptor: PropertyDescriptor,
) => PropertyDescriptor

export const withErrorHandling = <T>(): DecoratorFactory<T> => {
  return function (_target: T, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value

    descriptor.value = async function (...args: unknown[]) {
      const req: Partial<RequestWithToken> = args[0]
      const res: Partial<Response> = args[1]
      const { token } = req

      try {
        await original.apply(this, args)
      } catch (e) {
        AppLogger.error(`[Controller][${key}] => Path ${req.path} => ${e}`)
        const { errorsResponse, code } = errorToResponse(e, token)

        return res.status(code).send(errorsResponse)
      }
    }

    return descriptor
  }
}
