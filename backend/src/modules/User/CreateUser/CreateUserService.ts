require('dotenv').config

import { UserLogged } from "../../../entities/UserLogged";
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
            throw new Error('Usuário ou senha inválidos')
        }

        const space_between_cpf = this.userRepository.hasWhiteSpace(data.cpf);

        if (space_between_cpf) {
            throw new Error('Cpf não pode possuir espaços em branco')
        }

        const user = await this.userRepository.findByCpf(data.cpf);

        if (user) {
            return user.id;
        }

        const createdUser = await this.userRepository.createUser(data);

        console.log(createdUser)
    
        return createdUser.id;
    }

}

export { CreateUserService }