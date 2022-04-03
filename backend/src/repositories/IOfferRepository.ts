import { Offer } from "../entities/Offer";
import { ICreateOfferRequest } from "../modules/Offer/CreateOfer/CreateOfferService";

export interface IOfferRepository {
    createTaxForOffer(data: ICreateOfferRequest): Promise<number>
    getPredict(data: number): Promise<number>

    saveOffer(amount_split: number,
        amount_of_rest_splits: number,
        actual_value_split: number,
        financed_value_without_fee: number,
        type: string,
        old_tax: number,
        new_tax: number,
        actual_score: number,
        id_user: string,
        expire_at: Date): Promise<string>
    acceptOffer(id: string): Promise<number>
    conferenceIds(id_offer: string, id_user: string): Promise<boolean>
}
