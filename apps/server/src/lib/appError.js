class AppError extends Error {
  constructor(message, { statusCode, code, data }) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
    this.data = data;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

class UserNotFoundError extends AppError {
  constructor(id) {
    super("User associated with this session was not found", {
      statusCode: 404,
      code: "USER_NOT_FOUND",
      data: { userId: id },
    });

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

class InvalidSessionError extends AppError {
  constructor(message = "Session invalid or has ended") {
    super(message, {
      statusCode: 401,
      code: "SESSION_INVALID",
    });
  }
}

class InvalidCredentialsError extends AppError {
  constructor() {
    super("Incorrect email or password", {
      statusCode: 401,
      code: "INVALID_CREDENTIALS",
    });

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(data) {
    super("Validation failed", {
      statusCode: 422,
      code: "VALIDATION_ERROR",
      data,
    });

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

class ResourceNotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, {
      statusCode: 404,
      code: "NOT_FOUND",
      data,
    });

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export {
  AppError,
  UserNotFoundError,
  InvalidCredentialsError,
  InvalidSessionError,
  ValidationError,
  ResourceNotFoundError,
};
