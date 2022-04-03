import { User } from "../entities/User";
import { IActualizeUserRequest } from "../modules/User/ActualizeUser/actualizeUserService";

import { ICreateUserRequest } from "../modules/User/CreateUser/CreateUserService";
import { IIndexUserRequest } from "../modules/User/IndexUser/IndexUserService";

export interface IUserRepository {
    encryptedPassword(password: string): Promise<string>
    findByCpf(cpf: string): Promise<User>
    hasWhiteSpace(username: string): boolean
    comparePassword(user: User, password: string): Promise<User>
    generateToken(id: string): Promise<string>
    decode(token: string): Promise<string>
    decodeTokenReturnUserId(req: string): Promise<string>
    createUser(data: ICreateUserRequest): Promise<User>
    search(data: IIndexUserRequest): Promise<User[]>
    actualizeUser(data: IActualizeUserRequest): Promise<number>
}
