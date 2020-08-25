import moment from "moment";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "Post";

  public async createPost(
    id: string,
    description: string,
    createAt: moment.Moment,
    creator_id: string,
    type?: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        description,
        createAt: moment(createAt, "DD/MM/YYYY").format("YYYY-MM-DD"),
        creator_id,
        type,
      })
      .into(PostDatabase.TABLE_NAME);
  }

  //   public async getRecipeById(id: string): Promise<any> {
  //     const result = await this.getConnection()
  //       .select("*")
  //       .from(RecipeDatabase.TABLE_NAME)
  //       .where({ id });
  //     return result[0];
  //   }

  //   public async checkRecipeOwnership(
  //     recipeId: string,
  //     userId: string
  //   ): Promise<boolean> {
  //     const res = await this.getConnection()(RecipeDatabase.TABLE_NAME)
  //       .count("id as count")
  //       .where({ id: recipeId })
  //       .andWhere({ user_id: userId });
  //     return Boolean(res[0].count);
  //   }

  //   public async editRecipe2(
  //     id: string,
  //     title: string,
  //     description: string
  //   ): Promise<void> {
  //     await this.getConnection()(RecipeDatabase.TABLE_NAME)
  //       .update({
  //         title,
  //         description,
  //       })
  //       .where({ id });
  //   }

  //   public async editRecipe(
  //     recipeId: string,
  //     title: string,
  //     description: string,
  //     userId: string
  //   ): Promise<boolean> {
  //     const response = await this.getConnection().raw(`
  //       UPDATE Recipes
  //       SET
  //         title = IF (user_id = '${userId}', '${title}', title),
  //         description = IF (user_id = '${userId}', '${description}', description)
  //       WHERE id = '${recipeId}';
  //     `);
  //     return Boolean(response[0].affectedRows);
  //   }

  //   public async deleteRecipe(id: string): Promise<void> {
  //     await this.getConnection()(RecipeDatabase.TABLE_NAME).del().where({ id });
  //   }
}
