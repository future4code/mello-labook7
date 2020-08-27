import {Request, Response} from "express";
import { Authenticator } from "../services/Authenticator";
import { FriendDatabase } from "../data/FriendDataBase";
import { UserDatabase } from "../data/UserDatabase";

export class FriendshipController {

    async makeFriendship (req: Request, res: Response) {
        try {
            const userFriendId = req.body.userFriendId;
            const token = req.headers.authorization as string;
        
            if (!userFriendId || userFriendId === "") {
              throw new Error("Verifique se os campos estão completos");
            }
        
            const userDatabase = new UserDatabase();
            const checkId = await userDatabase.userCheck(userFriendId);
        
            if (!checkId) {
              throw new Error("id do usuário que se deseja seguir não encontrado");
            }
        
            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);
        
            const friendshipDatabase = new FriendDatabase();
            const friendship = await friendshipDatabase.getFriendshipById(
              authenticationData.id
            );
        
            const relations = friendship.find((relation) => {
              return (
                relation.user_id === userFriendId || relation.friend_id === userFriendId
              );
            });
        
            if (relations) {
              throw new Error("Amizade já existente!");
            }
        
            const followDatabase = new FriendDatabase();
            await followDatabase.makeFriendship(authenticationData.id, userFriendId);
        
            res.status(200).send({
              message: "Seguindo usuário",
            });
        } catch (e) {
            res.status(400).send({
                message: e.sqlMessage || e.message,
            });
        } finally {
            await Promise.all([
                FriendDatabase.destroyConnection(),
                UserDatabase.destroyConnection(),
            ]);
        }
    }

    async undoFriendship (req: Request, res: Response) {
        try {
            const userToUnfollowId = req.body.userToUnfollowId;
            const token = req.headers.authorization as string;
        
            if (!userToUnfollowId) {
              throw new Error("Verifique se os campos estão completos");
            }
        
            const userDatabase = new UserDatabase();
            const checkId = await userDatabase.userCheck(userToUnfollowId);
        
            if (!checkId) {
              throw new Error(
                "id do usuário que se deseja deixar de seguir não encontrado"
              );
            }
        
            const authenticator = new Authenticator();
            const authenticationData = authenticator.getData(token);
        
            const friendDatabase = new FriendDatabase();
            await friendDatabase.undoFriendship(
              authenticationData.id,
              userToUnfollowId
            );
        
            res.status(200).send({
              message: "Deixou de seguir o usuário com sucesso",
            });
        } catch (e) {
        res.status(400).send({
            message: e.sqlMessage || e.message,
        });
        } finally {
            await Promise.all([
                FriendDatabase.destroyConnection(),
                UserDatabase.destroyConnection(),
            ]);
        }
    }
}