import moment from "moment";
import { BaseDatabase } from "./BaseDatabase";
import { PostFeedInputDTO, PostAndUserNameOutputDTO } from "../model/Post";

export class PostDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "Post";

  public async createPost(
    id: string,
    photo: string,
    description: string,
    createAt: moment.Moment,
    creator_id: string,
    type?: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        photo,
        description,
        createAt: moment(createAt, "DD/MM/YYYY").format("YYYY-MM-DD"),
        creator_id,
        type,
      })
      .into(PostDatabase.TABLE_NAME);
  }

  public async getPostInfoAndUserName(
    feedInput: PostFeedInputDTO,
    postsPerPage: number,
    offset: number
  ): Promise<PostAndUserNameOutputDTO[]> {
    const result = await this.getConnection().raw(`
    select p.*, u.name from Post p
    JOIN User u
    ON p.creator_id = u.id
    WHERE p.type LIKE "%${feedInput.postType}%"
    ORDER BY ${feedInput.orderBy} ${feedInput.orderType}
    LIMIT ${postsPerPage}
    OFFSET ${offset};
    `);

    const posts: PostAndUserNameOutputDTO[] = [];

    for (let post of result[0]) {
      posts.push({
        id: post.id,
        photo: post.photo,
        description: post.description,
        createAt: moment(post.createAt).format("DD/MM/YYYY"),
        creator_id: post.creator_id,
        type: post.type,
      });
    }

    return posts;
  }
}
