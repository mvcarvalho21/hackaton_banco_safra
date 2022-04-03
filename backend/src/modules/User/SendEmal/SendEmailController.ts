import { NextFunction, Request, Response } from "express";
import { SendEmailService } from "./SendEmailService";

class SendEmailController {

    constructor(
        private sendEmail: SendEmailService
    ) { }

    async handle(req: Request, res: Response, next: NextFunction) {
        try {

            const {
                amount
            } = req.body;

            const userLogged = await this.sendEmail.execute({
                amount
            });

            return res.json(userLogged);
        } catch (error) {
            next(error)
        }
    }
}

export { SendEmailController }