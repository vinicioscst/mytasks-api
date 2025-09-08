export class ApiError extends Error {
  public context: string

  constructor(
    public message: string,
    public status: number,
    context: string
  ) {
    super(message)

    this.context = context
  }
}

export class BadRequestError extends ApiError {
  constructor(
    public message: string,
    context: string
  ) {
    super(message, 400, context)
  }
}

export class UnauthorizedError extends ApiError {
  constructor(
    public message: string,
    context: string
  ) {
    super(message, 401, context)
  }
}

export class ForbiddenError extends ApiError {
  constructor(
    public message: string,
    context: string
  ) {
    super(message, 403, context)
  }
}

export class NotFoundError extends ApiError {
  constructor(
    public message: string,
    context: string
  ) {
    super(message, 404, context)
  }
}

export class ConflictError extends ApiError {
  constructor(
    public message: string,
    context: string
  ) {
    super(message, 409, context)
  }
}
