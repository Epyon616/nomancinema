import { BookingTimesProps } from './BookingTimes.types';
import './BookingTimes.css';

const BookingTimes = ({ showings, booking, firstName, lastName }: BookingTimesProps) => (
  <ul className="booking-times">
    {showings.data.map((s) => (
      <li key={s.id}>
        {new Date(s.showing_time).toLocaleString("en-GB", {})}
        <button
          disabled={
            booking.isPending || !firstName.trim() || !lastName.trim()
          }
          onClick={() =>
            booking.mutate({
              firstName: firstName.trim(),
              lastName: lastName.trim(),
              movieShowingId: s.id,
            })
          }
        >
          {booking.isPending ? "Booking…" : "Book"}
        </button>
      </li>
    ))}
  </ul>
)

export default BookingTimes;