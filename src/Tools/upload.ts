import { v2 as cloudinary } from "cloudinary";
import DatauriParser from "datauri/parser";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import path from "path";
import auth from "../middleware/auth";
import animalRouter from "../Routers/animalRouter";
import Animal from "../Schemas/animalSchema";
import { isOrganisation } from "./isOrganisation";

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
      const MAX_FILE_SIZE = BYTES_IN_KB * 200;

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
        await cloudinary.uploader.upload(p.content as string);
        animal.images.push(p.fileName as string);
        await animal.save();
      } catch (err) {
        return next(err);
      }
    }

    res.status(200).send("Files uploaded");
  }
);
