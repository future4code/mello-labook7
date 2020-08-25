import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "User";

  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        email,
        name,
        password,
      })
      .into(UserDatabase.TABLE_NAME);
  }

  public async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return result[0];
  }

  public async userCheck(id: string): Promise<any> {
    const result = await this.getConnection()
      .count("id as count")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });
    return Boolean(result[0].count);
  }
}
