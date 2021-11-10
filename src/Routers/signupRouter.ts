import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import basicUser from "../models/basicUser";
import Organisation from "../models/organisation";
import User from "../schemas/userSchema";
import { sendEmailOrg, sendEmailUser } from "../tools/emails";

const SALT = 10;

const signupRouter = express.Router();
const loginRouter = express.Router();
const organisationSignupRouter = express.Router();

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

  const nickname = user.role === "Organisation" ? user.name : user.nickname;

  const token = jwt.sign(
    { _id: user._id, nickname, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  return res.status(200).send({ accessToken: token });
});

// register user
signupRouter.post("/", async (req, res, next) => {
  const {
    email,
    nickname,
    password,
    fullname,
    hobby,
    dateOfBirth,
    about,
    occupation,
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, SALT);
  try {
    const user = await new basicUser({
      email,
      nickname,
      password: hashedPassword,
      fullname,
      hobby,
      dateOfBirth,
      about,
      occupation,
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

organisationSignupRouter.post("/", async (req, res, next) => {
  const { name, password, email, about, location, website } = req.body;
  const hashedPassword = await bcrypt.hash(password, SALT);
  try {
    const organisation = await new Organisation({
      password: hashedPassword,
      email,
      name,
      location,
      website,
      about,
      createdAt: new Date(),
    }).save();
    await sendEmailOrg(organisation);

    res.send(organisation); // do not send password please.
  } catch (error) {
    if (error instanceof Error) {
      console.log({ error });
      res.status(500).send({ message: error.message });
    }
  }
});

export { signupRouter, organisationSignupRouter, loginRouter };
