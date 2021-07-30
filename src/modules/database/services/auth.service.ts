import { User, UserDocument } from '../schema/user.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: any): Promise<any> {
      const payload = {
          username: user.username,
          role: user.role,
          sub: user._id
      }

    return {
        code: 200,
        user: user,
        message: 'success',
        access_token: this.jwtService.sign(payload)
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ username: username }).exec();

    if (!user)
      return {
        isValidate: false,
      };

    if (user && (await bcrypt.compare(password, user.password)))
      return {
        isValidate: true,
        user,
      };

    return {
      isValidate: false,
    };
  }
}
