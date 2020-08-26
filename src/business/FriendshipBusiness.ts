import { Friendship } from "../model/Friendship";
import { FriendDatabase } from "../data/FriendDataBase";

const friendshipDatabase = new FriendDatabase();

export class FriendshipBusiness {
    public async makeFriendship (userId: string, userFriendId: string) {
        const friendship = new Friendship(userId, userFriendId);
        
        
        const result = await friendshipDatabase.makeFriendship(userId, userFriendId)

        return result;
    }

    public async undoFriendship (userId: string, userFriendId: string) {
        const friendship = new Friendship(userId, userFriendId);
        const result = await friendshipDatabase.undoFriendship(userId, userFriendId)

        return result;
    }
}