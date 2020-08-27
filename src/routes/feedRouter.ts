import express from "express";
import { getFeed } from "../controller/getFeed";
import { FeedController } from "../controller/FeedController"

export const feedRouter = express.Router();

const feedController = new FeedController();

feedRouter.get("/", feedController.getFeed);
