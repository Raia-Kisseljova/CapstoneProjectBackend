import express from "express";
import Organisation from "../models/organisation";

const organisationRouter = express.Router();

organisationRouter.get("/:name", async (req, res, next) => {
  try {
    const user = await Organisation.findOne({ name: req.params.name });
    if (!user) {
      res.status(404).send({
        message: `Organisation with ${req.params.name} is not found!`,
      });
    } else res.send(user);
  } catch (error) {
    next();
  }
});

organisationRouter.put("/:_id/settings", async (req, res, next) => {
  try {
    const updatedUser = await Organisation.findByIdAndUpdate(
      req.params._id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedUser) {
      res
        .status(404)
        .send({ message: "Organisation wasn't found, nothing was updated" });
    }
    res.send(updatedUser);
  } catch (error) {
    next();
  }
});

organisationRouter.delete("/:_id", async (req, res, next) => {
  try {
    const user = Organisation.findById(req.params._id);
    if (!user) {
      res
        .status(404)
        .send({ message: `Organisation with ${req.params._id} is not found!` });
    }
    await Organisation.findByIdAndDelete(req.params._id);
    res.status(204).send();
  } catch (error) {
    next();
  }
});

export default organisationRouter;
