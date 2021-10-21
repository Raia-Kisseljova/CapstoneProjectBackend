import express from "express";
import User from "../Schemas/userSchema";

const signupRouter = express.Router();

// register
signupRouter.post("/", async (req, res, next) => {
  try {
    const user = await new User(req.body).save();
    res.send(user);
  } catch (error) {
    if (error instanceof Error) {
      console.log({ error });
      res.send(500).send({ message: error.message });
    }
  }
});

export default signupRouter;
