import { KnexUserRepository } from "../../../repositories/knex/KnexUserRepository";
import { ActualizeUserService } from "./ActualizeUserService";
import { ActualizeUserController } from "./ActualizeUserController";

export const ActualizeUserFactory = () => {
    const userRepository = new KnexUserRepository();
    const ActualizeUser = new ActualizeUserService(userRepository)
    const indexUserController = new ActualizeUserController(ActualizeUser);

    return indexUserController;
}