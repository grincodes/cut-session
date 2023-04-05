import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class BookingQueryParam {
  @IsInt()
  @Max(50)
  @Min(1)
  @Type(() => Number)
  limit: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  offset: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  merchant: string;
}
