import app from "./app.js";
import http from "http";
import env from "./config/env.js";

const server = http.createServer(app);

server.listen(env.PORT, env.HOST, () => {
  console.log(`Server is running at port ${env.PORT}.`);
});
