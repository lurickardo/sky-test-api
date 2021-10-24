import { UserForm } from './form';
import { Validator } from '../helpers/validator';
import { UserDto } from './dto/user.dto';
import User from '../database/models/User';
import {Token} from '../helpers/token';

export class UserService {
    public async findOne(_id: string): Promise<User> | null{
        const user: User = await User.findOne({ _id }).exec();
        return user;
    }

    public async create(userForm: UserForm): Promise<UserDto> {        
        await Validator.validate(userForm)

        await userForm.hashPassword();
        
        const userCreated: User = await User.create(userForm)

        const token: string = await Token.genToken({ id: userCreated._id });
        
        const userDto: UserDto = new UserDto(Object.assign(userCreated, {token}));
        
        await User.findOneAndUpdate({_id: userCreated._id}, userDto).exec();
        
        return userDto;
    }

    public async findByEmail(email: string): Promise<User> | null {
        const user: User = await User.findOne({ email }).exec();
        return user;
    }

    public async updateLastSignIn(user: User){
        const token: string = await Token.genToken({id: user._id})

        const userUpdated = Object.assign(user, {ultimo_login: Date.now(), token})

        return User.findOneAndUpdate({_id: user._id}, userUpdated).exec();
    }
}