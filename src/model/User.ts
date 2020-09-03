import { Post } from "./Post";

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private post?: Post[],
    private password?: string
  ) {}

  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
  getPost() {
    return this.post;
  }

  setId(id: string) {
    this.id = id;
  }
  setName(name: string) {
    this.name = name;
  }
  setEmail(email: string) {
    this.email = email;
  }
  setPassword(password: string) {
    this.password = password;
  }
  setPost(post: Post[]) {
    this.post = post;
  }

  static toUserModel(user: any): User {
    return new User(user.id, user.name, user.email);
  }
}

export interface SignupInputDTO {
  email: string;
  name: string;
  password: string;
}
