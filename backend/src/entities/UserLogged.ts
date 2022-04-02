export class UserInfo{
    public id: string;

    public name: string;
    public last_name: string;
    public email: string;

    constructor(props: UserInfo) {
        Object.assign(this, props);
    }
}

export class UserLogged {
    public user: UserInfo;
    public token: string;

    constructor(props: UserLogged) {
        Object.assign(this, props);
    }

}
