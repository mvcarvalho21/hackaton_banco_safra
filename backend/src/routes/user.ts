import { Router } from "express";
import { CreateUserFactory } from "../modules/User/CreateUser/CreateUserFactory";
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

export default routes;