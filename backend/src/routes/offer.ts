import { Router } from "express";
import { CreateOfferFactory } from "../modules/Offer/CreateOfer/CreateOfferFactory";

const routes = Router();
const auth = require('../middleware/auth');

//CRUD


routes.post('/offer', (request, response, next) =>
CreateOfferFactory().handle(request, response, next)
);

export default routes;