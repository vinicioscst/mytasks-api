import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ZodError, z } from 'zod/v4'
import { LoggerService } from '@/domain/services/LoggerService'
import { ApiError } from '@/shared/helpers/ApiErrors'

const loggerService = new LoggerService()

export function errorHandlerMiddleware(
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): Response {
  if (error instanceof ApiError) {
    loggerService.createErrorLog({
      requestContext: error.context,
      errorMessage: error.message,
      errorStack: error.stack || null,
      httpStatus: error.status,
      requestUrl: req.originalUrl,
      requestMethod: req.method,
      userId: res.locals.user?.id || null
    })

    return res.status(error.status).json({ error: error.message })
  } else if (error instanceof ZodError) {
    loggerService.createErrorLog({
      requestContext: 'Unknown',
      errorMessage: JSON.stringify(z.treeifyError(error)),
      errorStack: error.stack || null,
      httpStatus: 400,
      requestUrl: req.originalUrl,
      requestMethod: req.method,
      userId: res.locals.user?.id || null
    })

    return res.status(400).json({ error: z.prettifyError(error) })
  } else if (error instanceof jwt.JsonWebTokenError) {
    loggerService.createErrorLog({
      requestContext: 'Unknown',
      errorMessage: error.message,
      errorStack: error.stack || null,
      httpStatus: 401,
      requestUrl: req.originalUrl,
      requestMethod: req.method,
      userId: res.locals.user?.id || null
    })

    return res.status(401).json({ error: error.message })
  }

  loggerService.createErrorLog({
    requestContext: 'Unknown',
    errorMessage: error.message,
    errorStack: error.stack || null,
    httpStatus: 500,
    requestUrl: req.originalUrl,
    requestMethod: req.method,
    userId: res.locals.user?.id || null
  })

  return res.status(500).json({ error: 'Internal server error' })
}
