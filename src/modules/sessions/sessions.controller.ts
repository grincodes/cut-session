import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto, MerchantIdDto } from './dto/create-session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post(':merchantId')
  create(
    @Param() merchantIdDto: MerchantIdDto,
    @Body() createSessionDto: CreateSessionDto,
  ) {
    return this.sessionsService.create({
      merchantId: merchantIdDto.merchantId,
      ...createSessionDto,
    });
  }

  @Get(':merchantId')
  findOne(@Param('merchantId') merchantId: string) {
    return this.sessionsService.findByMerchantId(merchantId);
  }
}
