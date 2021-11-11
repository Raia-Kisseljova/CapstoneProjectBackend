import mongoose, { Model, Schema } from "mongoose";
import userSchema from "./userSchema";
import { IAnimal } from "../types";
const animalSchema = new mongoose.Schema(
  {
    petName: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["cat", "dog", "rodent", "bird"],
    },
    breed: { type: String },
    location: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      type: String,
      default: "https://ui-avatars.com/",
    },
    canLiveWithPets: {
      type: Boolean,
      required: true,
    },
    canLiveWithChildren: {
      type: Boolean,
      required: true,
    },
    indoorOnly: {
      type: Boolean,
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    animalURL: { type: String },
  },
  { timestamps: true }
);

const Animal: Model<IAnimal> = mongoose.model("Animal", animalSchema);
export default Animal;
