import { NextFunction, Request, Response } from "express";
import { SendEmailService } from "./SendEmailService";

class SendEmailController {

    constructor(
        private sendEmail: SendEmailService
    ) { }

    async handle(req: Request, res: Response, next: NextFunction) {
        try {

            // const {
            //     amount
            // } = req.body;
            
            //padronizado por 10
            const response = await this.sendEmail.execute({
                amount: 10
            });

            return res.json(response);
        } catch (error) {
            next(error)
        }
    }
}

export { SendEmailController }