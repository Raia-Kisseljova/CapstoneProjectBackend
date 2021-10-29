import express from "express";
import User from "../schemas/userSchema";
import Organisation from "../models/organisation";
import basicUser from "../models/basicUser";
import { sendEmailUser, sendEmailOrg } from "../tools/emails";

const signupRouter = express.Router();
const organisationRouter = express.Router();

// register user
signupRouter.post("/", async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = await new basicUser({
      ...req.body,
      createdAt: new Date(),
    }).save();
    await sendEmailUser(user);
    res.send(user);
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

export { signupRouter, organisationRouter };
