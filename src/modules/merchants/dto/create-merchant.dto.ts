import { plainToInstance } from 'class-transformer';
import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

export class CreateMerchantDto {
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  name: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @MaxLength(20)
  cityOfOperation: string;

  @IsString()
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsPhoneNumber()
  @MaxLength(20)
  phoneNumber: string;

  metadata: Record<string, any>;
}
