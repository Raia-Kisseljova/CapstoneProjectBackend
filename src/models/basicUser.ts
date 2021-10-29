import mongoose, { Schema } from "mongoose";
import userSchema from "../schemas/userSchema";
import { IUser } from "../types";

const basicUser = userSchema.discriminator(
  "BasicUser",
  new mongoose.Schema({
    nickname: { type: String, required: true },
    avatar: {
      type: String,
      default: "https://ui-avatars.com",
    },
    favourites: { type: Schema.Types.ObjectId, ref: "Animal" },
  })
);

// const organisation = userSchema.discriminator(
//   "Organisation",
//   organisationSchema
// );

export default mongoose.model<IUser>("BasicUser");
