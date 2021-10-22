import express from "express";
import cors from "cors";

import mongoose from "mongoose";
import {
  notFound404,
  forbidden,
  serverError,
  badRequest,
  unauthorized,
} from "./errorHandlers";

import signupRouter from "./Routers/signupRouter";
import userRouter from "./Routers/userRouter";
import animalRouter from "./Routers/animalRouter";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const { PORT, MONGO_CONNECTION } = process.env;

app.use(cors());

app.use(express.json());

app.use("/signup", signupRouter);
app.use("/user", userRouter);
app.use("/animal", animalRouter);

app.use(badRequest);
app.use(unauthorized);
app.use(forbidden);
app.use(notFound404);
app.use(serverError);

app.listen(PORT, async () => {
  try {
    await mongoose.connect(
      MONGO_CONNECTION as any,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as any
    );
    console.log(
      `✅ App is running on ${PORT} and was succesfully connected to DB`
    );
  } catch (error) {
    console.log("Db connection is failed ", error);
  }
});

app.on("error", (error) =>
  console.log(`❌ App is not running due to : ${error}`)
);
