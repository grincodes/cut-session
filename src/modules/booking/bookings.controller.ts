import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingService } from './bookings.service';

@Controller('booking')
export class BookingsController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  findOne(@Query('merchantId') merchantId: string) {
    return this.bookingService.findByMerchantId(merchantId);
  }
}
