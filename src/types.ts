import { Document } from "mongoose";

type Id = string;

export interface IBaseUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
}

export interface IUser extends IBaseUser {
  nickname: string;
  avatar: string;
  favorites: Id[];
}

export interface IOrganisation extends IBaseUser {
  name: string;
  location: string;
  website: string;
  animals: Id[];
}
