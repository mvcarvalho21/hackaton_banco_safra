import { KnexUserRepository } from "../../../repositories/knex/KnexUserRepository";
import { ActualizeUserService } from "./actualizeUserService";
import { ActualizeUserController } from "./actualizeUserController";

export const ActualizeUserFactory = () => {
    const userRepository = new KnexUserRepository();
    const ActualizeUser = new ActualizeUserService(userRepository)
    const indexUserController = new ActualizeUserController(ActualizeUser);

    return indexUserController;
}