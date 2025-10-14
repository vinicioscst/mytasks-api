import type { NextFunction, Request, Response } from 'express'

export const responseInterceptorMiddleware = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const originalJson = res.json

  res.json = function (data: any) {
    if (res.locals.accessToken) {
      if (
        !data ||
        (typeof data === 'object' && Object.keys(data).length === 0)
      ) {
        return originalJson.call(this, { accessToken: res.locals.accessToken })
      }

      if (typeof data === 'object' && data !== null && !data.accessToken) {
        data.accessToken = res.locals.accessToken
      }
    }

    return originalJson.call(this, data)
  }

  next()
}
