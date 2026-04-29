import env from "../config/env.js";
import { AppError } from "../lib/appError.js";

export default function errorResponse(error, req, res, next) {
  if (typeof error === "object") {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        success: false,
        code: "UNAUTHORIZED",
        message: error.message,
      });
    }

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        success: false,
        code: error.code,
        message: error.message,
        data: error.data,
      });
    }

    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        code: "USER_ALREADY_EXISTS",
        message: "User with this email already exists",
      });
    }
  }

  console.error("Unexpected error", error);

  return res.status(500).json({
    success: false,
    code: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong",
    details: env.NODE_ENV === "development" ? error : undefined,
  });
}
