import {Request, Response} from "express";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { PostDatabase } from "../data/PostDatabase";
import { BaseDatabase } from "../data/BaseDatabase";

export class PostController {

    async createPost (req: Request, res: Response) {
        try {
            const description = req.body.description;
            const createAt = req.body.createAt;
            const type = req.body.type;
        
            const token = req.headers.authorization as string;
        
            if (!description || !createAt) {
              throw new Error("Verifique se todos os campos estão preenchidos!");
            }
        
            const idGenerator = new IdGenerator();
            const id = idGenerator.generateId();
        
            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);
        
            const postDatabase = new PostDatabase();
            await postDatabase.createPost(
              id,
              description,
              createAt,
              authenticationData.id,
              type
            );
        
            res.status(200).send({
              message: "Post criado com sucesso!",
            });
          } catch (e) {
            res.status(400).send({
              message: e.sqlMessage || e.message,
            });
          } finally {
            await BaseDatabase.destroyConnection();
          }
    }

}