import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import connectMongo from "./db/mongo.db.js";

dotenv.config({ path: "./.env" });
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ credentials: true }));
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200).send({ "message": "Hello, Stranger from Express!" });
});

app.listen(port, () => {
  connectMongo();
  console.log(`\nServer Running At : http://localhost:${port}`);
});