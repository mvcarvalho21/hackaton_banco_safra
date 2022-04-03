import { NextFunction, Request, Response } from "express";
import { CreateUserService } from "./CreateUserService";

class CreateUserController {
    
    constructor(
        private CreateUser: CreateUserService
    ) { }

    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                cpf,
                email,
                phone,
                password,
                name,
                last_name
            } = req.body;

            const userLogged = await this.CreateUser.execute({
                cpf,
                email,
                phone,
                password,
                name,
                last_name
            });

            return res.status(201).json(userLogged);
        } catch (error) {
            next(error)
        }

    }
}

export { CreateUserController }