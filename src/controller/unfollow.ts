import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { FriendDatabase } from "../data/FriendDataBase";
import { UserDatabase } from "../data/UserDatabase";

export const unfollow = async (req: Request, res: Response) => {
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
    await friendDatabase.unfollowFriend(
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
};
