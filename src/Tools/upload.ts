import path, { dirname, join } from "path";
import fse from "fs-extra";
import { fileURLToPath } from "url";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import express from "express";

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});

export const parseFile = multer({ storage });

const folderForAnimalImg = join(
  dirname(fileURLToPath("")),
  "../../../public/images/animalImages"
);
const uploadRouter = express.Router();

export const saveAnimalPicture = (filename: any, contentBuffer: Buffer) =>
  fse.writeFile(join(folderForAnimalImg, filename), contentBuffer);

uploadRouter.post("/", multer().single("animalPic"), async (req, res, next) => {
  try {
    console.log(req.file);
    if (req.file && req.file.buffer) {
      await saveAnimalPicture(req.file.originalname, req.file.buffer as Buffer);
      res.send("Uploaded!");
    }
  } catch (error) {
    next(error);
  }
});
