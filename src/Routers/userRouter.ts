import express from "express";
import auth from "../middleware/auth";
import basicUser from "../models/basicUser";
import BasicUser from "../models/basicUser";
import Organisation from "../models/organisation";
import Animal from "../schemas/animalSchema";
import User from "../schemas/userSchema";
import { IUser } from "../types";

const userRouter = express.Router();

userRouter.post("/:nickname/favourites", auth, async (req, res) => {
  if (req.user.nickname !== req.params.nickname) {
    return res
      .status(403)
      .send({ message: "You are not allowed to perform this action." });
  }

  try {
    const user = await BasicUser.findOne({ nickname: req.params.nickname });
    const animal = await Animal.findOne({ _id: req.body._id });
    console.log("id" + req.body._id);
    if (user !== null && animal !== null) {
      user.favourites.push(animal._id);
      await user.save();
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

userRouter.get("/:nickname/favourites", async (req, res) => {
  const user = await BasicUser.findOne({ nickname: req.params.nickname });

  if (user === null) {
    return res.status(404).send();
  }

  const userFavourites = await Animal.find({
    _id: { $in: user.favourites },
  });

  res.send(userFavourites);
});

//Find user by nickname

// userRouter.get("/:_id", async (req, res, next) => {
//   console.log(req.params);
//   try {
//     const user = await User.findById({
//       _id: req.params._id,
//     });
//     console.log("user is", user);
//     if (!user) {
//       res.status(404).send({
//         message: `User with _id: '${req.params._id}' was not found!`,
//       });
//     } else res.send(user);
//   } catch (error) {
//     next();
//   }
// });\

userRouter.get("/is_unique", async (req, res, next) => {
  if (req.query.name) {
    try {
      const user = await Organisation.findOne({
        name: req.query.name as string,
      });
      res.send({ name: user ? false : true });
    } catch (error) {
      next();
    }
  }

  if (req.query.nickname) {
    try {
      const user = await basicUser.findOne({
        nickname: req.query.nickname as string,
      });
      res.send({ nickname: user ? false : true });
    } catch (error) {
      next();
    }
  }

  if (req.query.email) {
    try {
      const user = await User.findOne({ email: req.query.email as string });
      res.send({ email: user ? false : true });
    } catch (error) {
      console.log("here");
      next();
    }
  }
});

userRouter.get("/by_name/:nickname", async (req, res, next) => {
  console.log(req.params);
  try {
    const user = await basicUser.findOne({ nickname: req.params.nickname });
    console.log("user is", user);
    if (!user) {
      res.status(404).send({
        message: `User with nickname: '${req.params.nickname}' was not found!`,
      });
    } else res.send(user);
  } catch (error) {
    next();
  }
});

userRouter.put("/:_id/settings", auth, async (req, res, next) => {
  console.log("CURRENT USER", (req as any).user);
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params._id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      res
        .status(404)
        .send({ message: "User wasn't found, nothing was updated" });
    }
    res.send(updatedUser);
  } catch (error) {
    next();
  }
});

userRouter.delete("/:_id", auth, async (req, res, next) => {
  try {
    const user = User.findById(req.params._id);
    if (!user) {
      res
        .status(404)
        .send({ message: `User with ${req.params._id} is not found!` });
    }
    await User.findByIdAndDelete(req.params._id);
    res.status(204).send();
  } catch (error) {
    next();
  }
});

export default userRouter;
