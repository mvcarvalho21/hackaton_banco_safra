require('dotenv').config

import { UserLogged } from "../../../entities/UserLogged";
import { IUserRepository } from "../../../repositories/IUserRepository";


export interface ILoginRequest {
    cpf: string;
    password: string;
}

class LoginService {

    constructor(
        private userRepository: IUserRepository
    ) { }

    async execute(data: ILoginRequest) {

        if (!data.cpf || !data.password) {
            throw new Error('Usuário ou senha inválidos')
        }

        const space_between_cpf = this.userRepository.hasWhiteSpace(data.cpf);

        if (space_between_cpf) {
            throw new Error('Cpf não pode possuir espaços em branco')
        }

        const user = await this.userRepository.findByCpf(data.cpf);

        if (!user) {
            throw new Error('Usuário inexistente')
        }

        const compare = await this.userRepository.comparePassword(user, data.password);
       
        if (!compare) {
            throw new Error('Senha incorreta.')
        }
        const token = await this.userRepository.generateToken(user.id);

        if (!token) {
            throw new Error('Erro na criação do token')
        }

        const userLogged = new UserLogged({
            user: {
                id: user.id,
                name: user.name,
                last_name: user.last_name,
                email: user.email
            },
            token: token
        });

        return userLogged;
    }

}

export { LoginService }