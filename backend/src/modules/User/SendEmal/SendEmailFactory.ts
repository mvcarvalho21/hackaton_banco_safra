import { KnexUserRepository } from "../../../repositories/knex/KnexUserRepository";
import { SendEmailService } from "./SendEmailService";
import { SendEmailController } from "./SendEmailController";

export const SendEmailFactory = () => {
    const userRepository = new KnexUserRepository();
    const sendmails = new SendEmailService(userRepository)
    const sendmailsController = new SendEmailController(sendmails);

    return sendmailsController;
}