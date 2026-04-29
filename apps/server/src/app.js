import express from "express";
import notes from "./routes/notesRoute.js";
import successResponse from "./middleware/successResponseMiddleware.js";
import cookieParser from "cookie-parser";
import errorResponse from "./middleware/errorResponseMiddleware.js";
import auth from "./routes/authRoute.js";
import { ResourceNotFoundError } from "./lib/appError.js";

const app = express();

app.use(successResponse);
app.use(cookieParser());
app.use(express.json());

app.use("/api", auth);
app.use("/api", notes);

app.use((req, res, next) => {
  next(new ResourceNotFoundError());
});

app.use(errorResponse);

export default app;
