import { validate, ValidationError } from 'class-validator';

export class Validator {
  static async validate(genericClass: object) {
    return validate(genericClass).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        const message = errors.map((error) => error.constraints);

        return message;
      }
      return null;
    });
  }
}
