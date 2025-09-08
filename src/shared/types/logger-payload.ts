export interface IEmailLogPayload {
  subject: string
  from: string
  to: string
  userId: string
}

export interface IErrorLogPayload {
  requestContext?: string
  errorMessage: string
  errorStack: string | null
  httpStatus: number
  requestUrl: string
  requestMethod: string
  userId: string | null
}
