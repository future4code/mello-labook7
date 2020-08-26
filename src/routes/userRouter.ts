import express from "express";
import { signUp } from "../controller/signUp";
import { login } from "../controller/login";
import { makeFriendship } from "../controller/makeFriendship";
import { undoFriendship } from "../controller/undoFriendship";

export const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/friendship", makeFriendship);
userRouter.post("/unfollow", undoFriendship);
