import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { isMatch } from 'date-fns';

@ValidatorConstraint({ name: 'IsValidZuluTime', async: false })
export class IsValidZuluTime implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return isMatch(text, 'k:mm:ssx'); // for async validations you must return a Promise<boolean> here
  }

  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return 'Invalid time !';
  }
}
