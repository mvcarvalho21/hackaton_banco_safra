import { KnexUserRepository } from "../../../repositories/knex/KnexUserRepository";
import { LoginService } from "./LoginService";
import { LoginController } from "./LoginController";

export const LoginFactory = () => {
    const userRepository = new KnexUserRepository();
    const login = new LoginService(userRepository)
    const loginController = new LoginController(login);

    return loginController;
}