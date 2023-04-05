import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsRepo } from './bookings.repository';
import { BookingService } from './bookings.service';

@Module({
  controllers: [BookingsController],
  providers: [BookingService, BookingsRepo],
  exports: [BookingService],
})
export class BookingsModule {}
