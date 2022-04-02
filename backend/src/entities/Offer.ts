export class Offer {
    public readonly id?: string;

    public amount_split: number;
    public amount_of_rest_splits: number;
    public actual_value_split: number;
    public financed_value_without_fee: number;
    public type: string;
    public old_tax: number;
    public new_tax: number;
    public actual_score: number;
    public expire_at: Date;
    public id_user: string;

    constructor(props: Omit<Offer, 'id'>, uid?: string) {
        Object.assign(this, props);
    }

}