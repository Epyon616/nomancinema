import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBooking } from '../../../../../api/movies';
import { BookingFormType } from './BookingForm.types';
import './BookingForm.css';
import BookingTimes from '../BookingTimes';

const BookingForm = ({ showingsQuery, movieId }: BookingFormType) => {
  const queryClient = useQueryClient();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["showings", movieId] });
    },
  });

  return (
    <>
    <h3>Book now</h3>
    {showingsQuery.data && showingsQuery.data.length > 0 && (
      <>
        {bookingMutation.isError && (
          <div>
            Booking failed: <pre>{(bookingMutation.error as Error).message}</pre>
          </div>
        )}

        {bookingMutation.isSuccess && <div className="booking-confirmed">Booking confirmed ✅</div>}
        <div className="booking-form">
          <input
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <BookingTimes 
          showings={showingsQuery} 
          booking={bookingMutation} 
          firstName={firstName} 
          lastName={lastName} 
        />
      </>
    )}
  </>
);
}

export default BookingForm;