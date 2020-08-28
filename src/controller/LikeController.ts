import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { Authenticator } from "../services/Authenticator";
import { LikeBusiness } from "../business/LikeBusiness";

const authenticator = new Authenticator();
const likeBusiness = new LikeBusiness();

export class LikeController {

    async likePost (req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const postId = req.body.postId;

            if (postId === undefined || postId === "") {
                throw new Error("Id de post inválido.")
            }

            if (token === undefined || token === "") {
                throw new Error("Usuário deve estar logado.")
            }

            const authenticationData = authenticator.getData(token);
            
            const checkLike = await likeBusiness.checkLike(authenticationData.id, postId)
            if (checkLike !== 0) {
                throw new Error ("Você já curtiu este post!")
            }

            await likeBusiness.likePost(authenticationData.id, postId)
            
            res.status(200).send({
                message: "Post curtido com sucesso!"
            })
        } catch (e) {
            res.status(400).send({
                message: e.sqlMessage || e.message,
            });
        } finally {
            await BaseDatabase.destroyConnection();
        }
    }

    async dislikePost (req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string;
            const postId = req.body.postId;

            if (postId === undefined || postId === "") {
                throw new Error("Id de post para descurtir inválido.")
            }

            if (token === undefined || token === "") {
                throw new Error("Usuário deve estar logado.")
            }

            const userId = authenticator.getData(token).id;
            
            const checkLike = await likeBusiness.checkLike(userId, postId)
            if (checkLike === 0) {
                throw new Error ("Você ainda não curtiu este post para descurtir!")
            }

            await likeBusiness.likePost(userId, postId)
            
            res.status(200).send({
                message: "Post descurtido com sucesso!"
            })

        } catch (e) {
            res.status(400).send({
                message: e.sqlMessage || e.message,
            });
        } finally {
            await BaseDatabase.destroyConnection();
        }
    }
}