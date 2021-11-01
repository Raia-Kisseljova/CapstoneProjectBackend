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
  favorites: Id[];
}

export interface IOrganisation extends IBaseUser {
  role: "Organisation";
  name: string;
  location: string;
  website: string;
  animals: Id[];
}
