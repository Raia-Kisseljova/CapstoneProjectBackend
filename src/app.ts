import express from "express";
import cors from "cors";

import mongoose, { ConnectOptions } from "mongoose";
import {
  notFound404,
  forbidden,
  serverError,
  badRequest,
  unauthorized,
} from "./errorHandlers";

import {
  signupRouter,
  organisationRouter,
  loginRouter,
} from "./routers/signupRouter";
import userRouter from "./routers/userRouter";
import animalRouter from "./routers/animalRouter";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const { PORT, MONGO_CONNECTION } = process.env;

app.use(cors());

app.use(express.json());

app.use("/signup/organisation", organisationRouter);
app.use("/signup/user", signupRouter);
app.use("/login", loginRouter);
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
      MONGO_CONNECTION as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
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
