import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from 'src/infra/mysql/config/config';
import { validate } from 'src/infra/mysql/config/env.validation';
import { MysqlModule } from 'nest-mysql';
import { MerchantsModule } from '../merchants/merchants.module';
import { AuthModule } from '../authentication/auth.module';
import { SessionsModule } from '../sessions/sessions.module';
import { UserModule } from '../user/user.module';
import { ClientsModule } from '../clients/clients.module';
import { BookingsModule } from '../booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      validate,
      isGlobal: true,
    }),
    MysqlModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ...config.get('database'),
        port: 3306,
      }),
    }),
    UserModule,
    MerchantsModule,
    AuthModule,
    SessionsModule,
    ClientsModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
