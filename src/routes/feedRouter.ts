import express from "express";
import { getFeed } from "../controller/getFeed";

export const feedRouter = express.Router();

feedRouter.get("/", getFeed);
