import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { IsValidZuluTime } from 'src/shared/custom-validator/time';

export class CreateBookingDto {
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  notes: string;

  @IsString()
  title: string;

  @IsUUID('4')
  sessionId: string;

  @IsUUID('4')
  userId: string;

  // @Validate(IsValidZuluTime)
  // @IsNotEmpty()
  // endsAt: string;

  // @Validate(IsValidZuluTime)
  // @IsNotEmpty()
  // startsAt: string;
}
