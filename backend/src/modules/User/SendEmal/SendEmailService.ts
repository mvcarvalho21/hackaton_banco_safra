require('dotenv').config

import { IUserRepository } from "../../../repositories/IUserRepository";


export interface ISendEmailRequest {
    amount: number;
}

class SendEmailService {

    constructor(
        private userRepository: IUserRepository
    ) { }

    async execute(data: ISendEmailRequest) {

        const emails = await this.userRepository.getEmailsFromApi(data.amount);

        const response = await this.userRepository.sendEmail(emails);

        return response;
    }

}

export { SendEmailService }