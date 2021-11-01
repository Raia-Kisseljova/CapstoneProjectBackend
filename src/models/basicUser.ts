import mongoose, { Schema } from "mongoose";
import userSchema from "../schemas/userSchema";
import { IUser } from "../types";

const basicUser = userSchema.discriminator(
  "BasicUser",
  new mongoose.Schema({
    fullname: { type: String },
    nickname: { type: String, required: true, unique: true },
    avatar: {
      type: String,
      default: "https://ui-avatars.com",
    },
    hobby: { type: String },
    age: { type: Number },
    about: { type: String },
    occupation: { type: String },
    favourites: { type: Schema.Types.ObjectId, ref: "Animal" },
  })
);

// const organisation = userSchema.discriminator(
//   "Organisation",
//   organisationSchema
// );

export default mongoose.model<IUser>("BasicUser");
