import { UserForm } from './form/user.form';
import { Validator } from '../helpers/validator';
import { UserDto } from './dto/user.dto';
import User from '../database/models/User';
import {Token} from '../helpers/token';

export class UserService {
    public async create(userForm: UserForm): Promise<UserDto> {        
        await Validator.validate(userForm)

        await userForm.hashPassword();
        
        const userCreated: User = await User.create(userForm)

        const token: string = await Token.genToken(userCreated._id);
        
        const userDto: UserDto = new UserDto(Object.assign(userCreated, {token}));
        
        await User.findOneAndUpdate({_id: userCreated._id}, userDto);
        
        return userDto;
    }
}