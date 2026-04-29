import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import {
  compareToken,
  genAccessToken,
  genRefreshToken,
  hashToken,
  verifyRefreshToken,
} from "../utils/jwt.js";
import appConfig from "../config/index.js";
import { query } from "../lib/db.js";
import {
  AppError,
  InvalidCredentialsError,
  InvalidSessionError,
  UserNotFoundError,
} from "../lib/appError.js";
import {
  loginValidation,
  signupValidation,
} from "../validators/authValidators.js";
import { validationResult } from "express-validator";
import { validation } from "../middleware/authMiddleware.js";

const auth = Router();

auth.post(
  "/signup",
  signupValidation,
  validation,
  asyncHandler(async (req, res) => {
    const validationError = validationResult(req);

    const { username, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const userResult = await query(
      `INSERT INTO users (name, email, password)
   VALUES ($1, $2, $3)
   RETURNING id, name, created_at, updated_at`,
      [username, email, hashedPassword],
    );

    const { id: userId, created_at, updated_at } = userResult.rows[0];

    const accessToken = genAccessToken(userId);
    const refreshToken = genRefreshToken(userId);

    const hashedToken = hashToken(refreshToken);

    const tokenResult = await query(
      `INSERT INTO refresh_tokens (token, expires_at, user_id)
   VALUES ($1, $2, $3)
   RETURNING id, token, expires_at, user_id, created_at`,
      [hashedToken, appConfig.refreshToken.expiresAt, userId],
    );

    res.cookie(
      appConfig.refreshToken.cookie.name,
      refreshToken,
      appConfig.refreshToken.cookie.cookieOptions,
    );

    return res.success({
      statusCode: 201,
      code: "SIGNUP_SUCCESSFUL",
      data: {
        id: userId,
        email,
        username,
        created_at,
        updated_at,
        accessToken,
      },
    });
  }),
);

auth.post(
  "/login",
  loginValidation,
  validation,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const userResult = await query(
      `SELECT id, name, email, password, created_at, updated_at
   FROM users
   WHERE email = $1`,
      [email],
    );

    if (userResult.rows.length === 0) {
      throw new InvalidCredentialsError();
    }

    const {
      id,
      name: username,
      created_at,
      updated_at,
      password: dbPassword,
    } = userResult.rows[0];

    const isValidPassword = await comparePassword(password, dbPassword);

    if (!isValidPassword) {
      throw new InvalidCredentialsError();
    }

    const accessToken = genAccessToken(id);
    const refreshToken = genRefreshToken(id);

    const hashedToken = hashToken(refreshToken);

    const tokenResult = await query(
      `INSERT INTO refresh_tokens (token, expires_at, user_id)
   VALUES ($1, $2, $3)
   RETURNING id, token, expires_at, user_id, created_at`,
      [hashedToken, appConfig.refreshToken.expiresAt, id],
    );

    res.cookie(
      appConfig.refreshToken.cookie.name,
      refreshToken,
      appConfig.refreshToken.cookie.cookieOptions,
    );

    return res.success({
      statusCode: 200,
      code: "LOGIN_SUCCESSFUL",
      message: "Successfully logged in",
      data: {
        id,
        email,
        username,
        created_at,
        updated_at,
        accessToken,
      },
    });
  }),
);

auth.post(
  "/refresh",
  asyncHandler(async (req, res) => {
    const token = req.cookies[appConfig.refreshToken.cookie.name];

    if (!token) {
      throw new InvalidSessionError("Refresh token is required");
    }

    const userPayload = verifyRefreshToken(token);

    const tokenResult = await query(
      `SELECT id, token, expires_at, user_id, created_at
   FROM refresh_tokens
   WHERE user_id = $1`,
      [userPayload.id],
    );

    if (tokenResult.rows.length === 0) {
      res.clearCookie(appConfig.refreshToken.cookie.name);
      throw new UserNotFoundError(userPayload.id);
    }

    const { token: hashedToken, expires_at } = tokenResult.rows[0];

    const isValidToken = compareToken(token, hashedToken);

    const isExpired = new Date() > new Date(expires_at);

    if (!isValidToken || isExpired) {
      res.clearCookie(appConfig.refreshToken.cookie.name);
      await query(`DELETE FROM refresh_tokens WHERE user_id = $1`, [
        userPayload.id,
      ]);
      throw new InvalidSessionError();
    }

    const accessToken = genAccessToken(userPayload.id);

    return res.success({
      statusCode: 200,
      code: "TOKEN_REFRESHED_SUCCESSFUL",
      message: "Token refreshed successfully",
      data: { accessToken },
    });
  }),
);

auth.post(
  "/logout",
  asyncHandler(async (req, res) => {
    const token = req.cookies[appConfig.refreshToken.cookie.name];

    if (token) {
      const hashedToken = hashToken(token);

      await query(`DELETE FROM refresh_tokens WHERE token = $1`, [hashedToken]);
    }

    res.clearCookie(appConfig.refreshToken.cookie.name);

    return res.success({
      statusCode: 200,
      code: "LOGOUT_SUCCESSFUL",
      message: "Successfully logged out",
    });
  }),
);

export default auth;
