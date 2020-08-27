import express from "express";
import { FriendshipController } from "../controller/FriendshipController";

export const friendshipRouter = express.Router();

const friendshipController = new FriendshipController();

friendshipRouter.post("/", friendshipController.makeFriendship);
friendshipRouter.post("/unfriend", friendshipController.undoFriendship);
