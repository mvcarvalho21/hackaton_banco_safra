require('dotenv').config();

import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";
import Crypto from "../../util/crypto";
import { errors } from "celebrate";
import jwt from 'jsonwebtoken';
import { ICreateUserRequest } from "../../modules/User/CreateUser/CreateUserService";
import { IIndexUserRequest } from "../../modules/User/IndexUser/IndexUserService";

const { promisify } = require('util');

const SECRET = process.env.JSON_WEBTOKEN_SECRET;
const EXPIRES_IN = Number(process.env.JSON_WEBTOKEN_EXPIRES_IN);

const knex = require("../../database/index");
const crypt = new Crypto();

class KnexUserRepository implements IUserRepository {

    async encryptedPassword(password: string): Promise<string> {
        const password_encrypted = await crypt.encrypt(password);
        console.log(password_encrypted, "PASS", password)
        return password_encrypted;
    }

    hasWhiteSpace(username: string) {
        return (username.indexOf(' ') >= 0);
    }

    async findByCpf(cpf: string): Promise<User> {

        let user = await knex('user')
            .where({ cpf })
            .first()

        return user;
    }

    async comparePassword(user: User, password: string) {
        const returned = await crypt.compare(password, user.password).then((result) => {
            return result ? user : undefined;
        });

        return returned;
    }

    async generateToken(id: string): Promise<string> {
        return jwt.sign({ id }, SECRET, { expiresIn: EXPIRES_IN });
    }

    async decode(token: string) {
        const decoded = await promisify(jwt.verify)(token, SECRET);
        return decoded;
    }

    async decodeTokenReturnUserId(req: string) {
        const authHeader = req;

        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) return errors({ statusCode: 401 })

        const verify = <any>jwt.verify(token, SECRET)

        if (!verify) return errors({ statusCode: 401 })

        return verify.id;
    }

    async createUser(data: ICreateUserRequest): Promise<User> {
        console.log(data, "DATA")
        const user = (await knex('user')
            .insert({
                cpf: data.cpf,
                email: data.email,
                phone: data.phone,
                password: data.password,
                name: data.name ? data.name : "",
                last_name: data.last_name ? data.last_name : ""
            }).returning('id'))[0]

        return user;
    }
    async search(data: IIndexUserRequest): Promise<User[]> {

        const query = knex('user')
            .limit(10)
            .offset((<number>data.page - 1) * 10)

        if (data.email) {
            query
            .where(knex.raw('email::text'), 'like', `%${data.email}%`)

        }
        if (data.cpf) {
            query
                .where(knex.raw('cpf::text'), 'like', `%${data.cpf}%`)
        }
        if (data.phone) {
            query.where('phone', 'like', data.phone)
        }

        const response = await query;

        return response;
    }

}



export { KnexUserRepository }