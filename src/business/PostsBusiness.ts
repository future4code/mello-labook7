import { Authenticator } from "../services/Authenticator";
import { PostAndUserNameOutputDTO, PostFeedInputDTO } from "../model/Post";
import { PostDatabase } from "../data/PostDatabase";

export class PostsBusiness {
  async getPostInfoAndUserName(
    token: string,
    feedInput: PostFeedInputDTO
  ): Promise<PostAndUserNameOutputDTO[]> {
    if (!feedInput.page || feedInput.page < 1 || Number.isNaN(feedInput.page)) {
      feedInput.page = 1;
    }

    const postsPerPage = 5;

    const offset = postsPerPage * (feedInput.page - 1);

    if (!feedInput.postType) {
      feedInput.postType = "";
      //throw new Error("Envie um nome de usuário válido");
    }

    if (
      feedInput.orderBy !== "description" &&
      feedInput.orderBy !== "createAt"
    ) {
      // throw new Error("Passe um parâmetro de ordenação válido")
      feedInput.orderBy = "description";
    }

    if (feedInput.orderType !== "ASC" && feedInput.orderType !== "DESC") {
      feedInput.orderType = "ASC";
    }

    const authenticator = new Authenticator();
    authenticator.getData(token);

    const postDatabase = new PostDatabase();
    const posts = await postDatabase.getPostInfoAndUserName(
      feedInput,
      postsPerPage,
      offset
    );

    return posts;
  }
}
