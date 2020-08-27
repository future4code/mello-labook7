import {Request, Response} from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  
    async signUp (req: Request, res: Response) {
        try {
            const email = req.body.email;
            const name = req.body.name;
            const password = req.body.password;
        
            const userBusiness = new UserBusiness();
            const token = await userBusiness.signUp(email, name, password);
        
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

    async login (req: Request, res: Response) {
        try {
            const email = req.body.email;
            const password = req.body.password;
    
            const userBusiness = new UserBusiness();
            const token = await userBusiness.login(email, password)
    
            res.status(200).send({
                message: 'Usuário logado com sucesso',
                token
              })
        } catch(e) {
            res
                .status(400)
                .send({
                    message: e.sqlMessage || e.message
                })
        }
        await BaseDatabase.destroyConnection();
    }
}