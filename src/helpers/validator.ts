import { validate, ValidationError } from "class-validator";

export class Validator {
     static async validate(genericClass: Object) {
        validate(genericClass).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                console.log(errors);
            }
        });
    }
}