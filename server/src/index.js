import path from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import userRouter from "./routes/user.route.js";
import connectMongo from "./db/mongo.db.js";
import { app, server } from "./socket/socket.js";

dotenv.config({ path: "./.env" });
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);
app.use("/api/user", userRouter);
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  // res.status(200).send({ "message": "Hello, Stranger from Express!" });
  res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
});

server.listen(port, () => {
  connectMongo();
  console.log(`\nServer Running At : http://localhost:${port}`);
});