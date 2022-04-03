import { KnexUserRepository } from "../../../repositories/knex/KnexUserRepository";
import { SendEmailService } from "./SendEmailService";
import { SendEmailController } from "./SendEmailController";

export const SendEmailFactory = () => {
    const userRepository = new KnexUserRepository();
    const login = new SendEmailService(userRepository)
    const loginController = new SendEmailController(login);

    return loginController;
}