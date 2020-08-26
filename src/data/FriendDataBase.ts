import { BaseDatabase } from "./BaseDatabase";

export class FriendDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "Friendship";

  public async makeFriendship(user_id: string, friend_id: string): Promise<void> {
    await this.getConnection()
      .insert({
        user_id,
        friend_id,
      })
      .into(FriendDatabase.TABLE_NAME);
  }
  
  public async undoFriendship(
    user_id: string,
    friend_id: string
  ): Promise<void> {
    await this.getConnection()
      .delete()
      .from(FriendDatabase.TABLE_NAME)
      .where({ friend_id })
      .andWhere({ user_id });
  }

  public async getFriendshipById(id: string) :Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(FriendDatabase.TABLE_NAME)
      .where({
        user_id: id
      })
      .orWhere({
        friend_id: id
      })

      return result;
  }

  //   public async getFeed(user_id: string): Promise<any> {
  //     const response = await this.getConnection().raw(`
  //     SELECT
  // 	    r.id,
  // 	    r.title,
  // 	    r.description,
  // 	    r.creation_date AS createdAt,
  // 	    u.id AS userId,
  // 	    u.name AS userName
  //     FROM
  // 	    Follow_Relation f JOIN Users u ON f.follow_id = u.id
  // 	    JOIN Recipes r ON r.user_id = u.id
  //     WHERE
  // 	    f.user_id = '${user_id}'
  //     `);
  //     return response[0];
  //   }
}
