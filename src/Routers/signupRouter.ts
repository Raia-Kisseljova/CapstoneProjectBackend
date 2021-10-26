import express from "express";
import User from "../Schemas/userSchema";
import Organisation from "../models/organisation";
import basicUser from "../models/basicUser";
const signupRouter = express.Router();
const organisationRouter = express.Router();

// register user
signupRouter.post("/", async (req, res, next) => {
  try {
    const user = await new basicUser({
      ...req.body,
      createdAt: new Date(),
    }).save();
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
    res.send(organisation);
  } catch (error) {
    if (error instanceof Error) {
      console.log({ error });
      res.status(500).send({ message: error.message });
    }
  }
});

export { signupRouter, organisationRouter };
