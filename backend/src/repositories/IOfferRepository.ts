import { Offer } from "../entities/Offer";
import { ICreateOfferRequest } from "../modules/Offer/CreateOfer/CreateOfferService";

export interface IOfferRepository {
    createTaxForOffer(data:ICreateOfferRequest): Promise<number>
    getPredict():Promise<number>
}
