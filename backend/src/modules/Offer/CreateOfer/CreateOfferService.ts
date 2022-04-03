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
        console.log(old_tax, "TAX")

        //ver se é variável
        switch (predict) {
            case 3: {
                (data.type === 'variable') ? new_tax = old_tax/12 - 0.4 : new_tax = old_tax - 0.4
                break;
            }
            case 2: {
                (data.type === 'variable') ? new_tax = old_tax/12 - 0.2 : new_tax = old_tax - 0.2
                break;
            }
            case 1: {
                if (data.amount_of_rest_installment > 24) {
                    (data.type === 'variable') ? new_tax = old_tax/12 - 0.05 : new_tax = old_tax - 0.05
                } else {
                    (data.type === 'variable') ? new_tax = old_tax/12 - 0.01 : new_tax = old_tax - 0.01
                }
                break;
            }
            case 0: {
                new_tax = old_tax + 10
                break;
            }
        }
        
        const value_to_pay = data.amount_of_rest_installment * data.actual_value_installment

        const value_to_decrease = (new_tax * data.actual_value_installment) / 100;

        const value_to_decrease_old = (old_tax * data.actual_value_installment) / 100;

        const new_value_installment = data.actual_value_installment - (value_to_decrease_old - value_to_decrease)

        const actual_value_installment = data.actual_value_installment * new_tax

        const vle_to_pay =  (data.financed_value_without_fee/data.amount_installment)*data.amount_of_rest_installment

        let response = <any>-1

        if (new_tax < old_tax) {

            const today = new Date()
            const tomorrow = new Date(today)
            const tomorrowDate = new Date(tomorrow.setDate(tomorrow.getDate() + 1))

            const result = await this.OfferRepository.saveOffer(data.amount_installment,
                data.amount_of_rest_installment,
                data.actual_value_installment,
                data.financed_value_without_fee,
                data.type,
                old_tax,
                new_tax,
                predict,
                data.id,
                tomorrowDate)

            response = {
                actual_tax: old_tax*12,
                actual_value_installment: data.actual_value_installment,
                new_value_installment: actual_value_installment,
                new_tax: new_tax*12,
                saved_value: value_to_pay - (new_value_installment * data.amount_of_rest_installment),
                new_total_value: new_value_installment * data.amount_of_rest_installment,
                id_offer: result
            }
        }

        return response;
    }

}

export { CreateOfferService }