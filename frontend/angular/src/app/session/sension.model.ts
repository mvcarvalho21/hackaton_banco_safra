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

}

export interface ReturnSimulacao {

}

export interface RequestSimulacaoResultado {

}

export interface ReturnSimulacaoResultado {

}
