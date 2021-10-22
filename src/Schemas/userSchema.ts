import mongoose, { Schema } from "mongoose";

interface userOptionsType {
  discriminatorKey: String;
  collection: String;
}

const userOptions: userOptionsType = {
  discriminatorKey: "role",
  collection: "users",
};

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date },
  },
  userOptions as any
);

export default mongoose.model("User", userSchema);
