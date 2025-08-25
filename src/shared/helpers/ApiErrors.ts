export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number
  ) {
    super(message)
  }
}

export class BadRequestError extends ApiError {
  constructor(public message: string) {
    super(message, 400)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(public message: string) {
    super(message, 401)
  }
}

export class ForbiddenError extends ApiError {
  constructor(public message: string) {
    super(message, 403)
  }
}

export class NotFoundError extends ApiError {
  constructor(public message: string) {
    super(message, 404)
  }
}

export class ConflictError extends ApiError {
  constructor(public message: string) {
    super(message, 409)
  }
}
