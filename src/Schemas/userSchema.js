import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: "https://ui-avatars.com/api/?name=Unnamed+User",
    },
    organisation: {
      type: String, required: true
    }
  },
  { timestamps: true }
);



export default mongoose.model("User", userSchema);
