import { IBaseUser, IOrganisation, IUser } from "../types";

export const isOrganisation = (user: IUser | IOrganisation): boolean => {
  if (user.role === "Organisation") {
    return true;
  } else {
    return false;
  }
};
