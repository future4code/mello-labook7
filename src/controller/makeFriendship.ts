import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { FriendDatabase } from "../data/FriendDataBase";
import { UserDatabase } from "../data/UserDatabase";

export const makeFriendship = async (req: Request, res: Response) => {
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

    // const friendshipDatabase = new FriendDatabase();
    // const friendship = await friendshipDatabase.getFriendshipById(
    //   authenticationData.id
    // );

    // const relations = friendship.find((relation) => {
    //   return (
    //     relation.user_id === userFriendId || relation.friend_id === userFriendId
    //   );
    // });

    // if (relations) {
    //   throw new Error("Amizade já existente!");
    // }

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
};
