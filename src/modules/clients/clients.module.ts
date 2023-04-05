import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { UserModule } from '../user/user.module';
import { MerchantsModule } from '../merchants/merchants.module';

@Module({
  imports: [UserModule, MerchantsModule],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
