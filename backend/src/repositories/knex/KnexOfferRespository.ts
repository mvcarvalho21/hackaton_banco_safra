require('dotenv').config();

import { Offer } from "../../entities/Offer";
import { ICreateOfferRequest } from "../../modules/Offer/CreateOfer/CreateOfferService";
import { IOfferRepository } from "../IOfferRepository";

const knex = require("../../database/index");
const axios = require("axios").default;

class KnexOfferRepository implements IOfferRepository {

    async createTaxForOffer(data: ICreateOfferRequest): Promise<number> {

        let response;

        switch (data.type) {
            case "fixed": {

                const paid_value = (data.amount_installment - data.amount_of_rest_installment) * data.actual_value_installment

                const total_with_fee = (data.amount_of_rest_installment * data.actual_value_installment)

                const rest_value = data.financed_value_without_fee / data.amount_installment * data.amount_of_rest_installment

                const result = (data.actual_value_installment * data.amount_installment) - data.financed_value_without_fee

                const result2 = result / data.financed_value_without_fee / data.amount_installment * 100

                response = result2
                // Valor restante (sem juros) = (5000 / 12 x 5) = 2083
                // Taxa de juros = 650 x 12 - 5000 = 2800 / 5000 / 12 x 100 = 0,4666/mês = 46,66 %/mês
                break;
            }
            case "variable": {

                const calc1 = data.financed_value_without_fee / data.amount_installment; //ok

                const tax_per_month = data.actual_value_installment - calc1 // ok

                const result = (tax_per_month / data.financed_value_without_fee) * 1200

                response = result/12;
                break;
            }
        }

        return response;

    }

    async getPredict(data: number): Promise<number> {

        let result;

        let options = {
            method: 'GET',
            url: 'http://localhost:3737/predict?valor_financ='+data,
            // body: {

            // }
        };

        await axios.request(options).then(async function (response) {
            result = response.data.category
        }).catch(function (error) {
            console.error(error);
        });
        return result;
    }

    async saveOffer(amount_installment: number, amount_of_rest_installment: number, actual_value_installment: number, financed_value_without_fee: number, type: string, old_tax: number, new_tax: number, actual_score: number, id_user: string, expire_at: Date): Promise<string> {

        const offer = (await knex('offer').insert({
            amount_split: amount_installment,
            amount_of_rest_splits: amount_of_rest_installment,
            actual_value_split: actual_value_installment,
            financed_value_without_fee: financed_value_without_fee,
            type: type,
            old_tax: old_tax,
            new_tax: new_tax,
            actual_score: actual_score,
            id_user: id_user,
            expire_at: expire_at
        }).returning('id'))[0]

        return offer.id;
    }

    async acceptOffer(id: string): Promise<number> {

        const response = await knex('offer')
            .update({ accepted: true })
            .where({ id })

        return response;
    }

    async conferenceIds(id_offer: string, id_user: string): Promise<boolean> {

      
        let result = false;

        const today = new Date();
        const response = await knex('offer')
            .where('id_user', '=', id_user)
            .where('id', '=', id_offer)
            .where('expire_at', '>=', today)

        if (response.length > 0) {
            result = true;
        }

        return result;
    }
}



export { KnexOfferRepository }