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

                const total_with_fee = data.amount_installment * data.actual_value_installment
                
                const paid_installments = data.amount_installment - data.amount_of_rest_installment

                const paid_value = total_with_fee * paid_installments;

                const rest_value_with_fee = total_with_fee * data.amount_of_rest_installment; //saldo devedor

                const rest_value_without_fee = (data.financed_value_without_fee / data.amount_installment * data.amount_of_rest_installment)

                const taxed = total_with_fee * data.amount_installment - data.financed_value_without_fee;

                const result = taxed / data.financed_value_without_fee / data.amount_installment * 100

                response = result;
            }
            case "variable": {

                const calc1 = data.financed_value_without_fee / data.amount_installment;

                const tax_per_month = data.actual_value_installment - calc1

                const result = tax_per_month / (0.001 * data.financed_value_without_fee) * 1200

                response = result;
            }
        }
   
        return response;

    }

    async getPredict(): Promise<number> {
        
        let result;

        let options = {
            method: 'POST',
            url: 'http://localhost:8888/predict',
            // body: {

            // }
        };

        await axios.request(options).then(async function (response) {
            console.log(response.data);
            result = response.data
        }).catch(function (error) {
            console.error(error);
        });
        
        return result;
    }

}



export { KnexOfferRepository }