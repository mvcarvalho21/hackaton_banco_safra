import { KnexUserRepository } from "../../../repositories/knex/KnexUserRepository";
import { IndexUserService } from "./IndexUserService";
import { IndexUserController } from "./IndexUserController";
export const IndexUserFactory = () => {
    const userRepository = new KnexUserRepository();
    const IndexUser = new IndexUserService(userRepository)
    const indexUserController = new IndexUserController(IndexUser);

    return indexUserController;
}