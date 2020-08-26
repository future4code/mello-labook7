import { BaseDatabase } from "./BaseDatabase";

export class FriendDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "Friendship";

  public async makeFriendship(
    user_id: string,
    friend_id: string
  ): Promise<void> {
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

  public async getFriendshipById(id: string): Promise<any[]> {
    const result = await this.getConnection()
      .select("*")
      .from(FriendDatabase.TABLE_NAME)
      .where({
        user_id: id,
      })
      .orWhere({
        friend_id: id,
      });

    return result;
  }

  public async getFeed(user_id: string): Promise<any> {
    const response = await this.getConnection().raw(`
    SELECT
    p.id,
    p.description,
    p.createAt,
p.creator_id,
    p.type,
    u.name
  FROM Post p
  JOIN User u ON p.creator_id = u.id
  JOIN Friendship f ON p.creator_id = f.friend_id OR p.creator_id = f.user_id
  WHERE (f.friend_id = '${user_id}') AND p.creator_id <> '${user_id}'
  ORDER BY createAt DESC;
      `);
    return response[0];
  }
}
