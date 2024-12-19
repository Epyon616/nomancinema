import { BookAgainType } from './types';

const BookAgain = ({ postResponse, handleBookAgain }: BookAgainType) => {
  return (
    <>
    <h1 className="booking-confirmed">{postResponse}</h1>
    <button type="button" className="book-again-button" onClick={handleBookAgain}>Book again</button>
  </>
  );
}

export default BookAgain;