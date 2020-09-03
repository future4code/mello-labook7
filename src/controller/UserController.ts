import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserBusiness } from "../business/UserBusiness";
import { SignupInputDTO } from "../model/User";

export class UserController {
  async signUp(req: Request, res: Response) {
    try {
      const input: SignupInputDTO = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };

      const userBusiness = new UserBusiness();
      const token = await userBusiness.signUp(
        input.name,
        input.email,
        input.password
      );

      res.status(200).send({
        message: "Usuário criado com sucesso",
        token,
      });
    } catch (e) {
      res.status(400).send({
        message: e.sqlMessage || e.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }

  async login(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const userBusiness = new UserBusiness();
      const token = await userBusiness.login(email, password);

      res.status(200).send({
        message: "Usuário logado com sucesso",
        token,
      });
    } catch (e) {
      res.status(400).send({
        message: e.sqlMessage || e.message,
      });
    }
    await BaseDatabase.destroyConnection();
  }
}
