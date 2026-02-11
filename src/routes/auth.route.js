import express from "express";
import { deleteUser, listUsers, loginUser, registerUser,detailUser } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.get("/", listUsers)
authRouter.get("/:userId", detailUser);
authRouter.delete("/:userId", deleteUser);
export default authRouter;