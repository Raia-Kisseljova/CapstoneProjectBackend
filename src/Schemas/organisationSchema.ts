import mongoose, { Schema } from "mongoose";
import userSchema from "./userSchema";

const organisationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: {
      type: String,
      default: "https://ui-avatars.com",
    },
    location: { type: String, required: true },
    website: { type: String },
    animals: { type: Schema.Types.ObjectId, ref: "Animal" },
    role: { type: String, enum: ["Organisation", "organisation"] },
  },
  { timestamps: true }
);

const organisation = userSchema.discriminator(
  "Organisation",
  organisationSchema
);

export default mongoose.model("Organisation");
