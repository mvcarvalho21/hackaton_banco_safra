import { KnexUserRepository } from "../../../repositories/knex/KnexUserRepository";
import { CreateUserService } from "./CreateUserService";
import { CreateUserController } from "./CreateUserController";
export const CreateUserFactory = () => {
    const userRepository = new KnexUserRepository();
    const CreateUser = new CreateUserService(userRepository)
    const createUserController = new CreateUserController(CreateUser);

    return createUserController;
}