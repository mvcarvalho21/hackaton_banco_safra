require('dotenv').config

import { IOfferRepository } from "../../../repositories/IOfferRepository";
import { IUserRepository } from "../../../repositories/IUserRepository";

export interface IAcceptOfferRequest {
    id_offer: string;
}

class AcceptOfferService {

    constructor(
        private UserRepository: IUserRepository,
        private OfferRepository: IOfferRepository
    ) { }


    // async execute(data: IAcceptOfferRequest, token: string) {
    async execute(data: IAcceptOfferRequest) {
        // const id_user = await this.UserRepository.decodeTokenReturnUserId(token);
        
        // const conferenceIdOfferAndUser = await this.OfferRepository.conferenceIds(data.id_offer, id_user);

        // if(!conferenceIdOfferAndUser){
        //     throw new Error('Usuário ou oferta inválida');
        // }

        if (!data.id_offer) {
            throw new Error('Oferta inválida')
        }

        const response = await this.OfferRepository.acceptOffer(data.id_offer);

        return response;
    }

}

export { AcceptOfferService }