import { KnexOfferRepository } from "../../../repositories/knex/KnexOfferRespository";
import { KnexUserRepository } from "../../../repositories/knex/KnexUserRepository";
import { AcceptOfferService } from "./AcceptOfferService";
import { AcceptOfferController } from "./AcceptOfferController";

export const AcceptOfferFactory = () => {
    const OfferRepository = new KnexOfferRepository();
    const userRepository = new KnexUserRepository();
    const AcceptOffer = new AcceptOfferService(userRepository, OfferRepository)
    const acceptOfferController = new AcceptOfferController(AcceptOffer);

    return acceptOfferController;
}