import { Module } from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { MerchantsController } from './merchants.controller';
import { MerchantsRepository } from './merchants.repository';
import { AuthModule } from '../authentication/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [MerchantsController],
  providers: [MerchantsService, MerchantsRepository],
  exports: [MerchantsService, MerchantsRepository],
})
export class MerchantsModule {}
