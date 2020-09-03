import express from "express";
import { PostController } from "../controller/PostController";
import { LikeController } from "../controller/LikeController";

export const postRouter = express.Router();
const postController = new PostController();
const likeController = new LikeController();

postRouter.post("/", postController.createPost);
postRouter.get("/", postController.getPostInfoAndUserName);
postRouter.post("/like", likeController.likePost);
postRouter.post("/dislike", likeController.dislikePost);