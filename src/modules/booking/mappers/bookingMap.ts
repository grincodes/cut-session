import { Mapper } from 'src/core/infra/mapper';
import { Booking } from '../domain/booking';

export class BookingMapper extends Mapper<Booking> {
  public static toPersistence(booking: Booking) {
    return {
      bookingId: booking.id.toString(),
      bookingRef: booking.id.toString().split('-')[0],
      userId: booking.userId,
      sessionId: booking.sessionId,
      date: booking.date,
      title: booking.title,
      notes: booking.notes,
    };
  }
}
