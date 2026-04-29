import env from "./env.js";

const now = new Date();

const appConfig = {
  refreshToken: {
    expiresAt: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
    jwtOptions: { expiresIn: "30d" },
    cookie: {
      name: "refreshToken",
      cookieOptions: {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      },
    },
  },
  accessToken: { expiresIn: "15m" },
};

export default appConfig;
