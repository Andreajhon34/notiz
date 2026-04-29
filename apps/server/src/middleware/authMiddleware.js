import { Router } from "express";
import { validationResult } from "express-validator";
import { InvalidSessionError, ValidationError } from "../lib/appError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const validation = asyncHandler((req, res, next) => {
  const errors = validationResult(req).formatWith(({ msg, path }) => {
    return {
      field: path,
      message: msg,
    };
  });

  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array());
  }

  next();
});

export const authentication = asyncHandler((req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new InvalidSessionError();
  }

  const token = authorization.split(" ")[1];

  const decoded = verifyAccessToken(token);

  req.user = { id: decoded.id };

  next();
});
