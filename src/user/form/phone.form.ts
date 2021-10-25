import { Length, IsNumber } from "class-validator";

export class Phone {
    @Length(9)
    @IsNumber()
    numero: number;

    @Length(2)
    @IsNumber()
    ddd: number;
}