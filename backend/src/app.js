import "dotenv/config";
import express from "express";
import { createServer } from "node:http";
import mongoose, { set } from "mongoose";
import cors from "cors";
import {connectToSocket} from "./controllers/socketManager.js";
import userRoutes from "./routes/user.routes.js"

const MONGODB_ADDR = (process.env.MONGODB_ADDR || "not_set")

if(MONGODB_ADDR === "not_set"){
  throw new Error("Mongo DB not Set!!!");
}

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}))

app.use("/api/v1/users", userRoutes);

const start = async () => {
  const connectionDb = await mongoose.connect(MONGODB_ADDR);
  console.log(`Connected to mongodb: ${connectionDb}`);
  server.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
  });
};

start();