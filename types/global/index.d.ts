import { IBaseUser, IOrganisation } from "../../src/types";

declare global {
  namespace Express {
    interface Request {
      user?: IUser | IOrganisation;
    }
  }
}
