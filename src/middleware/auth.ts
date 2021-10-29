import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../schemas/userSchema";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader === undefined) {
    return res
      .status(401)
      .setHeader("WWW-Authenticate", "Bearer")
      .send({ message: "No authentication credentials provided." });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .setHeader("WWW-Authenticate", "Bearer")
      .send({ message: "Invalid token format." });
  }

  const token = authHeader.slice(7);

  jwt.verify(token, process.env.JWT_SECRET as string, async (err, payload) => {
    if (err) {
      return res
        .status(401)
        .setHeader("WWW-Authenticate", "Bearer")
        .send({ message: "Invalid token." });
    } else {
      const user = await User.findOne({ _id: (payload as any)._id });
      if (user === null) {
        return res
          .status(401)
          .setHeader("WWW-Authenticate", "Bearer")
          .send({ message: "Invalid token." });
      } else {
        req.user = user;
        next();
      }
    }
  });
};

export default auth;
