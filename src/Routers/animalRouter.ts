import express from "express";
import Animal from "../schemas/animalSchema";
import { checkAnimalSchema, checkValidationResult } from "../tools/validation";
const animalRouter = express.Router();

animalRouter.post(
  "/",
  checkAnimalSchema,

  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const animal = await new Animal({
        ...req.body,
        animalURL: req.body.petName + req.body.user,
      }).save();
      res.send(animal);
    } catch (error) {
      if (error instanceof Error) {
        console.log({ error });
        res.send(500).send({ message: error.message });
      }
    }
  }
);

animalRouter.get("/", async (req, res, next) => {
  try {
    const animals = await Animal.find({}).populate({
      path: "user",
      select: "name nickname email organisation",
    });
    res.send(animals);
  } catch (error) {
    if (error instanceof Error) {
      console.log({ error });
      res.send(500).send({ message: error.message });
    }
  }
});

//Find single animal
animalRouter.get("/:animalURL", async (req, res, next) => {
  try {
    const user = await Animal.findOne({ nickname: req.params.animalURL });
    if (!user) {
      res
        .status(404)
        .send({ message: `Animal with ${req.params.animalURL} wasn't found!` });
    } else res.send(user);
  } catch (error) {
    next();
  }
});

animalRouter.put("/:_id", async (req, res, next) => {
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(
      req.params._id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedAnimal) {
      res
        .status(404)
        .send({ message: "Animal wasn't found, nothing was updated" });
    }
    res.send(updatedAnimal);
  } catch (error) {
    next();
  }
});

animalRouter.delete("/:_id", async (req, res, next) => {
  try {
    const animal = Animal.findById(req.params._id);
    if (!animal) {
      res
        .status(404)
        .send({ message: `Animal with ${req.params._id} wasn't found!` });
    }
    await Animal.findByIdAndDelete(req.params._id);
    res.status(204).send();
  } catch (error) {
    next();
  }
});

export default animalRouter;
