require('dotenv').config();

import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";
import Crypto from "../../util/crypto";
import { errors } from "celebrate";
import jwt from 'jsonwebtoken';
import { ICreateUserRequest } from "../../modules/User/CreateUser/CreateUserService";
import { IIndexUserRequest } from "../../modules/User/IndexUser/IndexUserService";
import { IActualizeUserRequest } from "../../modules/User/ActualizeUser/ActualizeUserService";
import * as nodemailer from 'nodemailer'

const { promisify } = require('util');

const SECRET = process.env.JSON_WEBTOKEN_SECRET;
const EXPIRES_IN = Number(process.env.JSON_WEBTOKEN_EXPIRES_IN);

const knex = require("../../database/index");
const crypt = new Crypto();
const axios = require("axios").default;

class KnexUserRepository implements IUserRepository {

    async encryptedPassword(password: string): Promise<string> {
        const password_encrypted = await crypt.encrypt(password);
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

    async actualizeUser(data: IActualizeUserRequest): Promise<number> {

        const response = await knex('user')
            .update({
                password: await this.encryptedPassword(data.password),
                name: data.name ? data.name : null,
                last_name: data.last_name ? data.last_name : null
            })
            .where('id', '=', data.id)

        return response;

    }

    async getEmailsFromApi(data: number): Promise<string[]> {

        let result = [];

        let options = {
            method: 'GET',
            url: 'http://localhost:3737/emails/' + data,
        };

        await axios.request(options).then(async function (response) {
            result = response.data
        }).catch(function (error) {
            console.error(error);
        });

        return result;

    }

    async sendEmail(data: string[]): Promise<void> {
        for (let i = 0; i < data.length; i++) {
            if (process.env.TEST === "true") {
                console.log("EMAIL ENVIADO PARA: " + data[i])
            } else {

                const transporter = nodemailer.createTransport({
                    host: process.env.MAIL_HOST,
                    service: process.env.MAIL_SERVICE,
                    port: 587,
                    secure: true,
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASS
                    }
                })
                await transporter.sendMail({
                    from: process.env.USER,
                    to: data[i],
                    subject: "Oportunidade 1",
                    html: "Message teste"
                },
                    (error) => {
                        if (error) {
                            console.log(error)
                            return error
                        }
                    })
                    
            }
        }
    }

}



export { KnexUserRepository }