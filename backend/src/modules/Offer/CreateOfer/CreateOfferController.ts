import { NextFunction, Request, Response } from "express";
import { CreateOfferService } from "./CreateOfferService";
class CreateOfferController {
    constructor(
        private CreateOffer: CreateOfferService
    ) { }

    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                amount_installment,
                amount_of_rest_installment,
                actual_value_installment,
                financed_value_without_fee,
                type
            } = req.body;

            const {
                id
            } = req.params;

            const offer = await this.CreateOffer.execute({
                id,
                amount_installment,
                amount_of_rest_installment,
                actual_value_installment,
                financed_value_without_fee,
                type
            });
            return res.status(200).json(offer);
        } catch (error) {
            next(error)
        }

    }
}

export { CreateOfferController }