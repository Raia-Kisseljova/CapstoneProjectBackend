import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../schemas/userSchema";
import Organisation from "../models/organisation";
import basicUser from "../models/basicUser";
import { sendEmailUser, sendEmailOrg } from "../tools/emails";

const SALT = 10;

const signupRouter = express.Router();
const loginRouter = express.Router();
const organisationRouter = express.Router();

loginRouter.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user === null) {
    return res.status(401).send({ message: "Invalid email and/or password. " });
  }

  const result = await bcrypt.compare(password, user.password);

  if (!result) {
    return res.status(401).send({ message: "Invalid email and/or password. " });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  return res.status(200).send({ accessToken: token });
});

// register user
signupRouter.post("/", async (req, res, next) => {
  const { email, nickname, password } = req.body;

  // check if email is available.
  // check if nickname is available.
  // validate password strength (at least length of 8).
  const hashedPassword = await bcrypt.hash(password, SALT);
  try {
    const user = await new basicUser({
      email,
      nickname,
      password: hashedPassword,
      createdAt: new Date(),
    }).save();
    await sendEmailUser(user);
    res.send(user); // do not send password please.
  } catch (error) {
    if (error instanceof Error) {
      console.log({ error });
      res.status(500).send({ message: error.message });
    }
  }
});

organisationRouter.post("/", async (req, res, next) => {
  try {
    const organisation = await new Organisation({
      ...req.body,
      createdAt: new Date(),
    }).save();
    await sendEmailOrg(organisation);
    res.send(organisation);
  } catch (error) {
    if (error instanceof Error) {
      console.log({ error });
      res.status(500).send({ message: error.message });
    }
  }
});

export { signupRouter, organisationRouter, loginRouter };
