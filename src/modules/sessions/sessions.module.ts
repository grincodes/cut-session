import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { SessionsRepo } from './session.repository';

@Module({
  controllers: [SessionsController],
  providers: [SessionsService, SessionsRepo],
  exports: [SessionsService],
})
export class SessionsModule {}
