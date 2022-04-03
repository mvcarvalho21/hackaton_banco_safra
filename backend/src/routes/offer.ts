import { Router } from "express";
import { AcceptOfferFactory } from "../modules/Offer/AcceptOffer/AcceptOfferFactory";
import { CreateOfferFactory } from "../modules/Offer/CreateOfer/CreateOfferFactory";

const routes = Router();
const auth = require('../middleware/auth');

//CRUD

routes.post('/offer/:id', (request, response, next) =>
CreateOfferFactory().handle(request, response, next)
);

routes.put('/offer/:id_offer', (request, response, next) =>
AcceptOfferFactory().handle(request, response, next)
);

export default routes;