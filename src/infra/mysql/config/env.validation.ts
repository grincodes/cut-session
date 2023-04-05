import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;
  @IsString()
  CUT_SESSION_DB_USER: string;
  @IsString()
  CUT_SESSION_DB_PASS: string;
  @IsString()
  CUT_SESSION_DB_HOST: string;
}

class DevEnv {
  @IsString()
  CUT_SESSION_DB_DEV_DB_NAME: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  if (config.NODE_ENV == 'development') {
    const devConfig = plainToInstance(DevEnv, config, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(devConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
  }

  return validatedConfig;
}
