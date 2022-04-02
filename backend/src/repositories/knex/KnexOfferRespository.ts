require('dotenv').config();

import { Offer } from "../../entities/Offer";
import { ICreateOfferRequest } from "../../modules/Offer/CreateOfer/CreateOfferService";
import { IOfferRepository } from "../IOfferRepository";

const knex = require("../../database/index");

class KnexOfferRepository implements IOfferRepository {

    async createTaxForOffer(data: ICreateOfferRequest): Promise<Offer> {

        let response;

        switch (data.type) {
            case "fixed": {

                const total_with_fee = data.amount_split * data.actual_value_split
                const paid_splits = data.amount_split - data.amount_of_rest_splits

                const paid_value = total_with_fee * paid_splits;
                const rest_value_with_fee = total_with_fee * data.amount_of_rest_splits; //saldo devedor

                const rest_value_without_fee = (data.financed_value_without_fee / data.amount_split * data.amount_of_rest_splits)

                const taxed = total_with_fee * data.amount_split - data.financed_value_without_fee;

                const result = taxed / data.financed_value_without_fee / data.amount_split * 100

                response = result;
            }
            case "variable": {

                const calc1 = data.financed_value_without_fee / data.amount_split;
                const tax_per_month = data.actual_value_split - calc1
                const result = tax_per_month / (0.001 * data.financed_value_without_fee) * 1200

                response = result;
            }
        }

        const today = new Date()
        const tomorrow = new Date(today)
        const expire_at = tomorrow.setDate(tomorrow.getDate() + 1)

        const offer = await knex('offer')
            .insert({
                amount_split: data.amount_split,
                amount_of_rest_splits: data.amount_of_rest_splits,
                actual_value_split: data.actual_value_split,
                financed_value_without_fee: data.financed_value_without_fee,
                type: data.type,
                old_tax: response,
                new_tax: 0,
                actual_score: 0,
                expire_at: expire_at,
                id_user: data.id
            })

        return offer;

    }

}



export { KnexOfferRepository }