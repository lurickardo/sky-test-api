import { Phone } from './phone.form';
import { IsArray, IsEmail, IsString, MaxLength } from "class-validator";
import { UserExists } from '../../validators/user-exists.validator';
import { Crypt } from '../../helpers/crypt';

export class UserForm {
    @IsString({
        message: "Nome deve ser uma string."
    })
    nome: string;

    @UserExists()
    @IsEmail({}, {
        message: "E-mail invalido."
    })
    email: string;

    @MaxLength(60, {message: "Senha deve conter no máximo 60 caracteres."})
    @IsString({
        message: "Senha deve ser uma string."
    })
    senha: string;

    @IsArray({message: "Telefones deve ser uma lista de telefones com numero e DDD."})
    telefones: Phone[];

    constructor(user: User) {
        this.nome = user.nome;
        this.email = user.email;
        this.senha = user.senha;
        this.telefones= user.telefones;
    }

    async hashPassword(): Promise<void> {
        this.senha = await Crypt.genHash(this.senha);
    }
}