import { KnexOfferRepository } from "../../../repositories/knex/KnexOfferRespository";
import { CreateOfferService } from "./CreateOfferService";
import { CreateOfferController } from "./CreateOfferController";

export const CreateOfferFactory = () => {
    const OfferRepository = new KnexOfferRepository();
    const CreateOffer = new CreateOfferService(OfferRepository)
    const createOfferController = new CreateOfferController(CreateOffer);

    return createOfferController;
}