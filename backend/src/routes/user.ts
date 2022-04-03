import { Router } from "express";
import { ActualizeUserFactory } from "../modules/User/ActualizeUser/ActualizeUserFactory";
import { CreateUserFactory } from "../modules/User/CreateUser/CreateUserFactory";
import { IndexUserFactory } from "../modules/User/IndexUser/IndexUserFactory";
import { LoginFactory } from "../modules/User/Login/LoginFactory";

const routes = Router();
const auth = require('../middleware/auth');

//CRUD

routes.post('/login', (request, response, next) =>
LoginFactory().handle(request, response, next)
);

routes.post('/user', (request, response, next) =>
CreateUserFactory().handle(request, response, next)
);

routes.get('/user', (request, response, next) =>
IndexUserFactory().handle(request, response, next)
);

routes.put('/user/:id', (request, response, next) =>
ActualizeUserFactory().handle(request, response, next)
);

export default routes;