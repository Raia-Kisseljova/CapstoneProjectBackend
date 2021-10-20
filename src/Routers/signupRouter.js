import express from "express";
import User from "../Schemas/userSchema.js";


const signupRouter = express.Router();

// register
signupRouter.post("/", async (req, res, next) => {
  try {
    const user = await new User(req.body).save();
    res.send(user)
  }
  catch (error) {
    console.log({ error });
    res.send(500).send({ message: error.message });
  }
})


export default signupRouter