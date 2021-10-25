type Phone = {
    numero: number,
    ddd: number;
}

type User = {
    _id?: string,
    token: string,
    nome: string,
    email: string,
    senha: string,
    telefones: Phone[]
    data_criacao?: Date,
    data_atualizacao?: Date,
    ultimo_login?: Date
}
