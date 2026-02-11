
import express from "express";
import { deleteUser, detailUser, listUsers } from "../repository/repository.js";
const userRouter = express.Router();

userRouter.get("/", listUsers);
userRouter.get("/:userId", detailUser);
userRouter.delete("/:userId", deleteUser);

export default userRouter;