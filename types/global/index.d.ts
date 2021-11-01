import { IBaseUser } from "../../src/types";

declare global {
  namespace Express {
    interface Request {
      user?: IBaseUser;
    }
  }
}
