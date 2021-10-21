import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    petName: { type: String, required: true },
    location: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      type: String,
      default: "https://ui-avatars.com/api/?name=Unnamed+User",
    },
    canLiveWithPets: {
      type: Boolean, required: true
    },
    canLiveWithChildren: {
      type: Boolean, required: true
    },
    indoorOnly: {
      type: Boolean, required: true
    }

  },
  { timestamps: true }
);



export default mongoose.model("Post", postSchema);
