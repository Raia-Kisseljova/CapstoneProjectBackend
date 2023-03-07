import express from "express";
import auth from "../middleware/auth";
import Animal from "../Schemas/animalSchema";
import { checkAnimalSchema, checkValidationResult } from "../Tools/validation";
import { isOrganisation } from "../Tools/isOrganisation";
import { v2 as cloudinary } from "cloudinary";
import DatauriParser from "datauri/parser";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";

const animalRouter = express.Router();

dotenv.config();

const parser = new DatauriParser();

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});
const BYTES_IN_KB = 1024;

export const upload = multer({
  // limits: {
  //   fileSize: BYTES_IN_KB * 20,
  // },
  // fileFilter: (req, file, cb) => {
  //  if (
  //     file.mimetype !== "image/png" &&
  //     file.mimetype !== "image/jpeg"
  //   ) {
  //     cb(new Error("File is not an image"));
  //   } else {
  //     cb(null, true);
  //   }
  // },
});

animalRouter.get("/:_id/upload", (req, res) => {
  res.send({ hello: "world" });
});

animalRouter.post(
  "/:_id/upload",
  auth,
  upload.array("animalPics", 12),
  async (req, res, next) => {
    const check = isOrganisation(req.user);
    if (check === false) {
      return res.status(403).send({
        message: "You must be an organisation to perform this action.",
      });
    }

    const { _id } = req.params;
    const animal = await Animal.findOne({ _id, user: req.user });

    console.log("HERE");
    if (animal === null) {
      return res.status(404).send();
    }

    if (req.files === undefined) {
      res.status(400).send({ message: "No files were uploaded" });
      return;
    }

    const files = req.files as Express.Multer.File[];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const BYTES_IN_KB = 1024;
      const MAX_FILE_SIZE = BYTES_IN_KB * 2 * 1024;

      if (file.size > MAX_FILE_SIZE) {
        return res
          .status(400)
          .send({ animalPics: { [i]: ["File is too large"] } });
      } else if (
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/jpeg"
      ) {
        return res
          .status(400)
          .send({ animalPics: { [i]: ["File is not an image"] } });
      }

      console.log(file.originalname);
      const p = parser.format(
        path.extname(file.originalname).toString(),
        file.buffer
      );

      try {
        const what = await cloudinary.uploader.upload(p.content as string);
        animal.images.push(what.secure_url);
        await animal.save();
      } catch (err) {
        return next(err);
      }
    }

    res.status(200).send("Files uploaded");
  }
);

animalRouter.post(
  "/",
  auth,
  checkAnimalSchema,

  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const check = isOrganisation(req.user);
    if (check === false) {
      return res.status(403).send({
        message: "You must be an organisation to perform this action.",
      });
    }
    try {
      const animal = await new Animal({
        ...req.body,
        animalURL: req.body.petName + req.body.user,
        user: req.user,
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
  console.log("\n\nLOOK HERE\n\n", req.query);
  const { city, type } = req.query;
  try {
    const animals = await Animal.find({
      location: { $regex: new RegExp(city as string, "i") },
      type: { $regex: new RegExp(type as string, "i") },
    } as any).populate({
      path: "user",
      select: "name nickname email organisation",
    });
    res.send(animals);
  } catch (error) {
    if (error instanceof Error) {
      console.log({ error });
      res.status(500).send({ message: error.message });
    }
  }
});

//Find single animal
animalRouter.get("/:_id", async (req, res, next) => {
  try {
    const animal = await Animal.findOne({ _id: req.params._id });
    if (!animal) {
      res
        .status(404)
        .send({ message: `Animal with ${req.params._id} wasn't found!` });
    } else res.send(animal);
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
