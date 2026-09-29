export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message = "Permintaan tidak valid", code = "BAD_REQUEST") {
    super(400, code, message);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Harap login terlebih dahulu", code = "UNAUTHORIZED") {
    super(401, code, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Data tidak ditemukan", code = "NOT_FOUND") {
    super(404, code, message);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Konflik data", code = "CONFLICT") {
    super(409, code, message);
  }
}