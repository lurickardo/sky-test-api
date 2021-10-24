import { IsEmail, MaxLength, IsString } from "class-validator";

export class SessionForm {
    @IsEmail({}, {
        message: "E-mail invalido."
    })
    email: string;

    @MaxLength(60, {message: "Senha deve conter no máximo 60 caracteres."})
    @IsString({
        message: "Senha deve ser uma string."
    })
    senha: string;

    constructor(user: User) {
        this.email = user.email;
        this.senha = user.senha;
    }
}