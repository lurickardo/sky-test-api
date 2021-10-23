import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import User from '../database/models/User'

@ValidatorConstraint({ async: true })
export class UserExistsConstraint implements ValidatorConstraintInterface {

  async validate(email: string): Promise<boolean> {
      return User.find().where({ email }).then((data: User[]) => { 
        return !data.length;
      })
  }

  defaultMessage?(validationArguments: ValidationArguments): string {
    return 'E-mail já existente.';
  }
}

export function UserExists(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'UserExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserExistsConstraint,
    });
  };
}
