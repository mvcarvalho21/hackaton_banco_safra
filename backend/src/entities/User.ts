export class User {
    public readonly id?: string;

    public cpf: string;
    public password: string;
    public name: string;
    public last_name: string;
    public email: string;
    public phone: string;

    constructor(props: Omit<User, 'id'>, uid?: string) {
        Object.assign(this, props);
    }

}