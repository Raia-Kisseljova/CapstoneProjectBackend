import mongoose, { Schema } from "mongoose";
import userSchema from "../Schemas/userSchema";

const Organisation = userSchema.discriminator(
  "Organisation",
  new mongoose.Schema({
    name: { type: String, required: true },
    avatar: {
      type: String,
      default: "https://ui-avatars.com",
    },
    location: { type: String, required: true },
    website: { type: String },
    animals: { type: Schema.Types.ObjectId, ref: "Animal" },
  })
);

// const organisation = userSchema.discriminator(
//   "Organisation",
//   organisationSchema
// );

export default mongoose.model("Organisation");