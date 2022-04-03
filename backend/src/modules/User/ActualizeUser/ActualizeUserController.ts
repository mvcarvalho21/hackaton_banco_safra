import { NextFunction, Request, Response } from "express";
import { ActualizeUserService } from "./ActualizeUserService";

class ActualizeUserController {
     

    constructor(
        private ActualizeUser: ActualizeUserService
    ) { }

    async handle(req: Request, res: Response, next: NextFunction) {
        try {

            const {
                password,
                name,
                last_name
            } = <any> req.body;

            const { 
                id
            } = req.params;

            const userLogged = <any> await this.ActualizeUser.execute({
                id,
                password,
                name,
                last_name
            });

            return res.status(200).json(userLogged);
        } catch (error) {
            next(error)
        }

    }
}

export { ActualizeUserController }