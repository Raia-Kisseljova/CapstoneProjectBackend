import express from "express";
import cors from "cors";

import mongoose from "mongoose";
import { notFound, forbidden, catchAllErrorHandler } from "./ErrorHandlers/index.js";

import signupRouter from "./Routers/signupRouter.js";
import userRouter from "./Routers/userRouter.js";

const app = express();

const { PORT, MONGO_CONNECTION } = process.env;

// const whiteList = ["http://localhost:3001"];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whiteList.some((allowedUrl) => allowedUrl === origin)) {
//       callback(null, true);
//     } else {
//       const error = new Error("Not allowed by cors!");
//       error.status = 403;

//       callback(error);
//     }
//   },
// };

app.use(cors());

app.use(express.json());

app.use("/signup", signupRouter);
app.use("/user", userRouter)


app.use(notFound);
app.use(forbidden);
app.use(catchAllErrorHandler);


app.listen(PORT, async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ Server is running on ${PORT}  and connected to db`);
  } catch (error) {
    console.log("Db connection is failed ", error);
  }
});

app.on("error", (error) =>
  console.log(`❌ Server is not running due to : ${error}`)
);
