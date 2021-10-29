import mongoose, { Schema, Document } from "mongoose";
import { IBaseUser } from "../types";

interface UserOptionsType {
  discriminatorKey: string;
  collection: string;
}

const userOptions: UserOptionsType = {
  discriminatorKey: "role",
  collection: "users",
};

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date },
  },
  userOptions
);

export default mongoose.model<IBaseUser>("User", userSchema);
