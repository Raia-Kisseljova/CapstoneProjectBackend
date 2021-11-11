import mongoose, { Schema } from "mongoose";
import userSchema from "../schemas/userSchema";
import { IOrganisation } from "../types";

const Organisation = userSchema.discriminator(
  "Organisation",
  new mongoose.Schema({
    name: { type: String, required: true },
    // nickname: { type: String, required: true },
    avatar: {
      type: String,
      default: "https://ui-avatars.com",
    },
    location: { type: String, required: true },
    website: { type: String },
    about: { type: String },
    animals: [{ type: Schema.Types.ObjectId, ref: "Animal" }],
  })
);

// const organisation = userSchema.discriminator(
//   "Organisation",
//   organisationSchema
// );

export default mongoose.model<IOrganisation>("Organisation");

/*
  const [step, setStep] = useState(0);
  
  if (step === 0) {
  return <StepOne setStep />
  } eles if (step === 1) {
  return <STepTwo steSTep />
  } else if (step === 2) {
    return <StepThree setSTep />
  } else ....
 */

// TODO:

// Add animal (organisation).
// Search animals (different filters).
// Add/remove animal to/from favorites (user).

// animals
// id | name | organisation_id

// add_animal PROTECTED token
// axios.post('dfdfs', data, { headers: { Authorization: `Bearer ${token}` } })

// organisations
// id | name

// favroites
// user_id | animal_id
