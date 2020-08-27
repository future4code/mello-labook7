export class Post {
  constructor(
    private id: string,
    private photo: string,
    private description: string,
    private createAt: Date,
    private creator_id: string,
    private type?: string
  ) {}

  getId() {
    return this.id;
  }
  getPhoto() {
    return this.photo;
  }
  getDescription() {
    return this.description;
  }
  getCreateAt() {
    return this.createAt;
  }
  getCreatorId() {
    return this.creator_id;
  }
  getType() {
    return this.type;
  }

  setId(id: string) {
    this.id = id;
  }
  setPhoto(photo: string) {
    this.photo = photo;
  }
  setDescription(description: string) {
    this.description = description;
  }
  setCreateAt(createAt: Date) {
    this.createAt = createAt;
  }
  setCreatorId(creator_id: string) {
    this.creator_id = creator_id;
  }
  setType(type: string) {
    this.type = type;
  }

  static toPostModel(post: any): Post {
    return new post(
      post.id,
      post.photo,
      post.description,
      post.createAt,
      post.creator_id,
      post.type
    );
  }
}

export type PostAndUserNameOutputDTO = {
  id: string;
  photo: string;
  description: string;
  createAt: string;
  creator_id: string;
  type: string;
};

export interface PostFeedInputDTO {
  postType: string;
  orderBy: string;
  orderType: string;
  page: number;
}
