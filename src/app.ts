import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import {
  badRequest,
  forbidden,
  notFound404,
  serverError,
  unauthorized,
} from "./errorHandlers";
import animalRouter from "./routers/animalRouter";
import {
  loginRouter,
  organisationRouter,
  signupRouter,
} from "./routers/signupRouter";
import userRouter from "./routers/userRouter";

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
