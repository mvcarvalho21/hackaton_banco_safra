export interface RequestCreateUser {
  cpf: string;
  email: string;
  phone: string;
  password?: string;
  name?: string;
  last_name?: string;
}

export interface ReturnCreateUser {
  uuid: string
}

export interface RequestSimulacao {
  amount_installment: number;
  amount_of_rest_installment: number;
  actual_value_installment: number;
  financed_value_without_fee: number;
  type: string;
}

export interface ReturnSimulacao {
  actual_tax: number;
  actual_value_installment: number;
  new_value_installment: number;
  new_tax: number;
  saved_value: number;
  new_total_value: number;
  id_offer: string
}
