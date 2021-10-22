import mongoose, { Schema } from "mongoose";
import userSchema from "../Schemas/userSchema";

const basicUser = userSchema.discriminator(
  "BasicUser",
  new mongoose.Schema(
    {
      nickname: { type: String, required: true },
      email: { type: String, required: true },
      avatar: {
        type: String,
        default: "https://ui-avatars.com",
      },
      favourites: { type: Schema.Types.ObjectId, ref: "Animal" },
      role: { type: String, enum: ["Standard user", "standard user"] },
    },
    { timestamps: true }
  )
);

// const organisation = userSchema.discriminator(
//   "Organisation",
//   organisationSchema
// );

export default mongoose.model("BasicUser");
