import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Password } from 'src/shared/password';
import { AuthRepository } from './auth.repository';
import { ACCESS_TYPE } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.authRepo.findOneByUsername(username);
    const isValidPass = Password.bcryptCompare(password, user.password);

    if (user && isValidPass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.authId,
      accessType: user.accessType,
    };

    let userId = null;
    let merchantId = null;

    if (user.accessType == 'MERCHANT') {
      merchantId = user.authId;
    } else {
      userId = user.authId;
    }

    return {
      token: this.jwtService.sign(payload),
      merchantId,
      userId,
    };
  }

  async createUser(
    id: string,
    username: string,
    password: string,
    accessType: ACCESS_TYPE,
  ): Promise<any> {
    return this.authRepo.create({ authId: id, username, password, accessType });
  }
}
