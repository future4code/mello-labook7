import express from "express";
import { signUp } from "../controller/signUp";
import { login } from "../controller/login";
import { friend } from "../controller/friend";
import { unfollow } from "../controller/unfollow";

export const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.post("/friendship", friend);
userRouter.post("/unfollow", unfollow);
