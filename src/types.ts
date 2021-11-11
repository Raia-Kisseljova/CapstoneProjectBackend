import { Document } from "mongoose";

type Id = string;

export interface IBaseUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
}

export interface IUser extends IBaseUser {
  role: "BasicUser";
  nickname: string;
  avatar: string;
  favourites: Id[];
}

export interface IOrganisation extends IBaseUser {
  role: "Organisation";
  name: string;
  location: string;
  website: string;
  animals: Id[];
}

export interface IAnimal extends Document {
  petName: string;
  breed: string;
  type: string;
  gender: string;
  image: string;
  location: string;
  description: string;
  canLiveWithPets: boolean;
  canLiveWithChildren: boolean;
  indoorOnly: boolean;
}
