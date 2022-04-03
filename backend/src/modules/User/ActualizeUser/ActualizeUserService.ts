require('dotenv').config

import { IUserRepository } from "../../../repositories/IUserRepository";

export interface IActualizeUserRequest {
    id: string;
    password: string;
    name?: string;
    last_name?: string;
}

class ActualizeUserService {

    constructor(
        private userRepository: IUserRepository
    ) { }

    async execute(data: IActualizeUserRequest) {

        if(!data.password){
            throw new Error('Password inválido')
        }

        const response = await this.userRepository.actualizeUser(data)

        return response;

    }

}

export { ActualizeUserService }