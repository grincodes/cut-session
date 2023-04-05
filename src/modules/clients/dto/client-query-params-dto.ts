import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsNumberString,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ACCESS_TYPE } from 'src/modules/authentication/constants';

export class ClientQueryParams {
  @IsInt()
  @Max(50)
  @Min(1)
  @Type(() => Number)
  limit: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  offset: number;

  @IsEnum(ACCESS_TYPE)
  type: ACCESS_TYPE;

  city: string;

  name: string;
}
