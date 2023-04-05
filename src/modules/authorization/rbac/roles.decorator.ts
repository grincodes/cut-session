import { SetMetadata } from '@nestjs/common';
import { ACCESS_TYPE } from 'src/modules/authentication/constants';
import { Role } from './role.enum';

export const ROLE_KEY = 'role';
export const Roles = (role: ACCESS_TYPE) => SetMetadata(ROLE_KEY, role);
