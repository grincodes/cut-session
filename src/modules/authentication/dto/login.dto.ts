import { IsEnum, IsString } from 'class-validator';
import { ACCESS_TYPE } from '../constants';

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(ACCESS_TYPE, {
    message: 'Invalid access type',
  })
  accessType: ACCESS_TYPE;
}
