import express from "express";
import User from "../schemas/userSchema";
import auth from "../middleware/auth";

const userRouter = express.Router();

//Find user by nickname

userRouter.get("/:nickname", async (req, res, next) => {
  try {
    const user = await User.findOne({ nickname: req.params.nickname });
    if (!user) {
      res
        .status(404)
        .send({ message: `User with ${req.params.nickname} is not found!` });
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
