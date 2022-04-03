import { NextFunction, Request, Response } from "express";
import { AcceptOfferService } from "./AcceptOfferService";

class AcceptOfferController {
    constructor(
        private AcceptOffer: AcceptOfferService
    ) { }

    async handle(req: Request, res: Response, next: NextFunction) {
        try {

            const {
                id_offer
            } = req.params;

            const offer = await this.AcceptOffer.execute({
                id_offer: id_offer
            }, req.headers['authorization']);
            console.log(offer, "OFER")
            return res.status(200).json(offer);
        } catch (error) {
            next(error)
        }

    }
}

export { AcceptOfferController }