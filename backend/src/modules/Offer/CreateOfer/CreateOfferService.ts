require('dotenv').config

import { IOfferRepository } from "../../../repositories/IOfferRepository";


export interface ICreateOfferRequest {
    id: string;
    amount_installment: number; // Quantidade de parcelas totais
    amount_of_rest_installment: number; // Quantidade de parcelas restantes
    actual_value_installment: number; // Valor atual da parcela
    financed_value_without_fee: number; // Valor financiado sem juros. Valor que o cliente pegou
    type: string; //Tipo da parcela, fixa ou variavel
}

class CreateOfferService {

    constructor(
        private OfferRepository: IOfferRepository
    ) { }

    async execute(data: ICreateOfferRequest) {

        if (data.amount_installment < 1) {
            throw new Error('Quantidade de parcelas totais inválida')
        }

        if (data.amount_of_rest_installment < 1) {
            throw new Error('Quantidade de parcelas restantes inválida')
        }

        if (data.actual_value_installment < 1) {
            throw new Error('Valor atual da parcela inválido')
        }
        if (data.financed_value_without_fee < 1) {
            throw new Error('Valor financiado sem juros inválido')
        }

        const old_tax = await this.OfferRepository.createTaxForOffer(data)

        const predict = await this.OfferRepository.getPredict(); // 1-4

        let new_tax;

        switch (predict) {
            case 3: {
                new_tax = old_tax - 0.4
            }
            case 2: {
                new_tax = old_tax - 0.2
            }
            case 1: {
                if (data.amount_of_rest_installment > 24) {
                    new_tax = old_tax - 0.05
                } else {
                    new_tax = old_tax - 0.01
                }
            }
            case 0: {
                new_tax = old_tax + 10
            }
        }

        const total_with_fee = data.amount_installment * data.actual_value_installment
                
        const paid_installments = data.amount_installment - data.amount_of_rest_installment

        const paid_value = total_with_fee * paid_installments;

        const rest_value_unpaid = total_with_fee - paid_value

        const new_value_installment = rest_value_unpaid*new_tax/data.amount_of_rest_installment;

        let response = <any>-1

        if(new_tax<old_tax){
            response = {
                actual_tax: old_tax,
                actual_value_installment: data.actual_value_installment,
                new_value_installment: new_value_installment,
                new_tax: new_tax,
                saved_value: total_with_fee-new_value_installment,
                new_total_value: rest_value_unpaid*new_tax
            }
        }
      
        return response;
    }

}

export { CreateOfferService }