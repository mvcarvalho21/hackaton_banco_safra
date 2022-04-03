require('dotenv').config

import { IUserRepository } from "../../../repositories/IUserRepository";


export interface ICreateUserRequest {
    cpf: string;
    email: string;
    phone: string;
    password?: string;
    name?: string;
    last_name?: string;
}

class CreateUserService {

    constructor(
        private userRepository: IUserRepository
    ) { }

    async execute(data: ICreateUserRequest) {

        if (!data.cpf) {
            throw new Error('Cpf inválido')
        }

        const space_between_cpf = this.userRepository.hasWhiteSpace(data.cpf);

        if (space_between_cpf) {
            throw new Error('Cpf não pode possuir espaços em branco')
        }

        const user = await this.userRepository.findByCpf(data.cpf);

        if (user) {
            return user.id;
        }

        let password_encrypted = null;
        if (data.password) {
            password_encrypted = await this.userRepository.encryptedPassword(data.password)
            const createdUser = await this.userRepository.createUser({ cpf: data.cpf, email: data.email, phone: data.phone, last_name: data.last_name, name: data.name, password: password_encrypted });

            return createdUser.id;
        } else {
            const createdUser = await this.userRepository.createUser(data);

            return createdUser.id;
        }
    }

}

export { CreateUserService }