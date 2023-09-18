import express from "express";
import { createServer } from "http";
import cors from "cors";
import "./loadEnv.js";
import router from "./router/index.js";
import morgan from "morgan";

const main = async () => {
  const app = express();
  app.use(morgan("combined"));
  app.use(
    cors({
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "Content-Type",
        "Accept",
        "X-Access-Token",
        "Authorization",
        "Access-Control-Allow-Origin",
      ],
      credentials: true,
      methods: "GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE",
      origin: ["http://localhost:5173"],
      preflightContinue: false,
    })
  );
  app.use("/upload", router);

  const httpServer = createServer(app);

  const PORT = process.env.PORT || 18000;

  httpServer.listen(PORT, () => {
    console.log(`SERVER STARTED ON PORT ${PORT}`);
  });
};

main().catch((err) => console.log("Error Start Server: ", err));
