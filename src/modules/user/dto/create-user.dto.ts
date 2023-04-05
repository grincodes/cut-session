import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(25)
  name: string;

  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsDateString()
  @IsString()
  dob: string;

  @IsString()
  @MaxLength(20)
  cityOfResidence: string;

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
