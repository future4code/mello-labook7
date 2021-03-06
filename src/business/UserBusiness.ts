import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";

export class UserBusiness {
  public async signUp(
    email: string,
    name: string,
    password: string
  ): Promise<string> {
    try {
      if (!email || !name || !password) {
        throw new Error("Favor preencher todos os campos");
      }

      if (email.indexOf("@") === -1) {
        throw new Error("E-mail inválido");
      }

      if (password.length < 6) {
        throw new Error("Sua senha deve conter mais de 6 caracteres");
      }

      const idGenerator = new IdGenerator();
      const id = idGenerator.generateId();

      const hashManager = new HashManager();
      const hashPassword = await hashManager.hash(password);

      const userDatabase = new UserDatabase();
      await userDatabase.createUser(id, email, name, hashPassword);

      const authenticator = new Authenticator();
      const token = authenticator.generateToken({ id });

      return token;
    } catch (e) {
      throw new Error(e.message || "Erro ao criar usuário.");
    }
  }

  public async login(email: string, password: string): Promise<string> {
    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserByEmail(email);

    const hashManager = new HashManager();
    const isPasswordCorrect = await hashManager.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Usuário ou senha incorretos");
    }

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({
      id: user.id,
    });

    return token;
  }
}
