import {Request, Response} from "express";
import { FriendDatabase } from "../data/FriendDataBase";
import { Authenticator } from "../services/Authenticator";
import moment from "moment";

export class FeedController {

    async getFeed (req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
        
            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);
        
            const friendDataBase = new FriendDatabase();
            const posts = await friendDataBase.getFeed(authenticationData.id);
        
            const mappedFeed = posts.map((item: any) => ({
              id: item.id,
              description: item.description,
              createAt: moment(item.createAt).format("DD/MM/YYYY"),
              creator_id: item.creator_id,
              userName: item.name,
              type: item.type,
            }));
        
            res.status(200).send(mappedFeed);
        } catch (e) {
            res.status(400).send({
                message: e.sqlMessage || e.message,
            });
        } finally {
            await FriendDatabase.destroyConnection();
        }
    }

}