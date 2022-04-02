import { NextFunction, Request, Response } from "express";
import { CreateOfferService } from "./CreateOfferService";
class CreateOfferController {
    constructor(
        private CreateOffer: CreateOfferService
    ) { }

    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                amount_split,
                amount_of_rest_splits,
                actual_value_split,
                financed_value_without_fee,
                type
            } = req.body;

            const {
                id
            } = req.params;

            const offer = await this.CreateOffer.execute({
                id,
                amount_split,
                amount_of_rest_splits,
                actual_value_split,
                financed_value_without_fee,
                type
            });

            return res.json(offer);
        } catch (error) {
            next(error)
        }

    }
}

export { CreateOfferController }