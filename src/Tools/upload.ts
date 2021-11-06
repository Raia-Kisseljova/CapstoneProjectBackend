import { v2 as cloudinary } from "cloudinary";
import DatauriParser from "datauri/parser";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import path from "path";

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

export const uploadRouter = express.Router();

uploadRouter.post(
  "/",
  upload.array("animalPics", 12),
  async (req, res, next) => {
    if (req.files === undefined) {
      res.status(400).send({ message: "No files were uploaded" });
      return;
    }

    const files = req.files as Express.Multer.File[];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const BYTES_IN_KB = 1024;
      const MAX_FILE_SIZE = BYTES_IN_KB * 20;

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
      } catch (err) {
        return next(err);
      }
    }

    console.log("here");
    res.status(200).send("Files uploaded");
  }
);
