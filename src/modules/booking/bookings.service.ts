import { BadRequestException, Injectable } from '@nestjs/common';
import { Booking, BookingProps } from './domain/booking';
import { BookingMapper } from './mappers/bookingMap';
import { BookingsRepo } from './bookings.repository';
import { BookingQueryParam } from './dto/booking-query-param';

@Injectable()
export class BookingService {
  constructor(private bookingRepo: BookingsRepo) {}
  async create(bookingProps: BookingProps) {
    const bookingRes = Booking.create(bookingProps);

    const booking = bookingRes.getValue();
    await this.bookingRepo.create(BookingMapper.toPersistence(booking));

    return {
      bookingId: booking.id.toString(),
      bookingRef: booking.id.toString().split('-')[0],
    };
  }

  async findByMerchantId(merchantId: string) {
    if (!merchantId) {
      throw new BadRequestException();
    }
    const result = await this.bookingRepo.findOneByMerchantId(merchantId);
    const { sessionId, ...rest } = result;
    rest.id = sessionId;

    return [rest];
  }

  async fetchBookings(bookingQueryParam: BookingQueryParam) {
    const res = await this.bookingRepo.fetchBookings(
      bookingQueryParam.offset,
      bookingQueryParam.limit,
      bookingQueryParam.city,
      bookingQueryParam.merchant,
    );
    return res;
  }
}
