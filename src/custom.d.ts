import { IBaseUser } from "./types";

declare global {
  namespace Express {
    interface Request {
      user?: IBaseUser;
    }
  }
}
