import { NextFunction, Request, Response } from "express";
import { LoginService } from "./LoginService";

class LoginController {

    constructor(
        private login: LoginService
    ) { }

    async handle(req: Request, res: Response, next: NextFunction) {
        try {

            const {
                cpf,
                password
            } = req.body;

            const userLogged = await this.login.execute({
                cpf,
                password,
            });

            return res.json(userLogged);
        } catch (error) {
            next(error)
        }
    }
}

export { LoginController }