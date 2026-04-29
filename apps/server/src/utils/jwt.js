import jwt from "jsonwebtoken";
import env from "../config/env.js";
import crypto from "crypto";

export const genRefreshToken = (id) => {
  return jwt.sign({ id }, env.JWT_REFRESH, { expiresIn: "30d" });
};

export const genAccessToken = (id) => {
  return `Bearer ${jwt.sign({ id }, env.JWT_ACCESS, { expiresIn: "15m" })}`;
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.JWT_REFRESH);
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, env.JWT_ACCESS);
};

export const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const compareToken = (token, hashedToken) => {
  return hashToken(token) === hashedToken;
};
