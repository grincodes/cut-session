import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { IsValidZuluTime } from '../../../shared/custom-validator/time';
import { SESSION_TYPE } from '../domain/session';

export class CreateSessionDto {
  @Validate(IsValidZuluTime)
  @IsNotEmpty()
  endsAt: string;

  @Validate(IsValidZuluTime)
  @IsNotEmpty()
  startsAt: string;

  @IsEnum(SESSION_TYPE)
  type: SESSION_TYPE;
}

export class MerchantIdDto {
  @IsUUID('4')
  merchantId: string;
}
