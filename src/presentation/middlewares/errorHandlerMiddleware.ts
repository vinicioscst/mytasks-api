import { NextFunction, Request, Response } from 'express'
import { ApiError } from '@/shared/helpers/ApiErrors'
import { ZodError, z } from 'zod/v4'
import jwt from 'jsonwebtoken'

export function errorHandlerMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): Response {
  if (error instanceof ApiError) {
    return res.status(error.status).json({ error: error.message })
  }

  if (error instanceof ZodError) {
    return res.status(400).json({ error: z.prettifyError(error) })
  }

  if (error instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({ error: error.message })
  }

  return res.status(500).json({ error: 'Internal server error' })
}
