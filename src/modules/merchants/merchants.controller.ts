import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MerchantsService } from './merchants.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { ACCESS_TYPE } from '../authentication/constants';
import { Roles } from '../authorization/rbac/roles.decorator';

@Controller('merchants')
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @Post()
  create(@Body() createMerchantDto: CreateMerchantDto) {
    return this.merchantsService.create(createMerchantDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  @Roles(ACCESS_TYPE.MERCHANT)
  getProfile(@Request() req) {
    return req.user;
  }

  @Get()
  findAll() {
    return this.merchantsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') merchant_id: string) {
    return this.merchantsService.findOne(merchant_id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) {
    return this.merchantsService.update(id, updateMerchantDto);
  }
}
