import { Phone } from '../form/phone.form';

export class UserDto {
    _id: string;
    token: string;
    nome: string;
    email: string;
    telefones: Phone[];
    data_criacao: Date;
    data_atualizacao: Date;
    ultimo_login: Date;

    constructor(user: User) {
        this._id = user._id;
        this.nome = user.nome;
        this.email = user.email;
        this.telefones = user.telefones;
        this.data_criacao = user.data_criacao;
        this.data_atualizacao = user.data_atualizacao;
        this.ultimo_login = user.ultimo_login;
        this.token = user.token;
    }
}