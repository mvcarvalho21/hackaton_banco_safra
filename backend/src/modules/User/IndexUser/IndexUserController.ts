import { NextFunction, Request, Response } from "express";
import { IIndexUserRequest, IndexUserService } from "./IndexUserService";

class IndexUserController { 

    constructor(
        private IndexUser: IndexUserService
    ) { }

    async handle(req: Request, res: Response, next: NextFunction) {
        try {

            const {
                cpf,
                email,
                phone,
                page
            } = <any> req.query;

            const userLogged = <any> await this.IndexUser.execute({
                cpf,
                email,
                phone,
                page
            });

            return res.status(200).json(userLogged);
        } catch (error) {
            next(error)
        }

    }
}

export { IndexUserController }