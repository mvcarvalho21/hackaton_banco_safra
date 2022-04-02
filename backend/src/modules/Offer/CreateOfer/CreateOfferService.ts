require('dotenv').config

import { IOfferRepository } from "../../../repositories/IOfferRepository";


export interface ICreateOfferRequest {
    id: string;
    amount_split: number; // Quantidade de parcelas totais
    amount_of_rest_splits: number; // Quantidade de parcelas restantes
    actual_value_split: number; // Valor atual da parcela
    financed_value_without_fee: number; // Valor financiado sem juros. Valor que o cliente pegou
    type: string; //Tipo da parcela, fixa ou variavel
}

class CreateOfferService {

    constructor(
        private OfferRepository: IOfferRepository
    ) { }

    async execute(data: ICreateOfferRequest) {

        if(data.amount_split < 1){
            throw new Error('Quantidade de parcelas totais inválida')
        }

        if(data.amount_of_rest_splits < 1){
            throw new Error('Quantidade de parcelas restantes inválida')
        }

        if(data.actual_value_split < 1){
            throw new Error('Valor atual da parcela inválido')
        }
        if(data.financed_value_without_fee < 1){
            throw new Error('Valor financiado sem juros inválido')
        }

        const response = await this.OfferRepository.createTaxForOffer(data)

        return response;

    }

}

export { CreateOfferService }