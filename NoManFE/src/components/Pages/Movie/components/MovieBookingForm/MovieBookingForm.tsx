import { MovieShowTimeType } from '../../../../../types/types';
import './MovieBookingForm.css';
import { MovieBookingFormType } from './types';

const MovieBookingForm = ({ 
  times, 
  booking, 
  handleChange, 
  handleSubmit 
}:MovieBookingFormType) => {
  return (
    <form>
      <label htmlFor="firstName">
        First Name: 
        <input 
          type="text" 
          name="firstName" 
          value={booking.firstName} 
          onChange={handleChange} 
        /> 
      </label>
      <label htmlFor="lastName">
        Last Name: 
        <input 
          type="text" 
          name="lastName" 
          value={booking.lastName} 
          onChange={handleChange} 
        /> 
      </label>
      <label>
        Select showing: 
        <select name="movieShowingId" onChange={handleChange} value={booking.movieShowingId} defaultValue={0}>
          <option disabled value="0">select an option</option>
          {times.map((time: MovieShowTimeType) => (
            <option
              key={time.time} 
              value={time.id}
            >
              {time.time}
            </option>
          ))}
        </select>
      </label>
      <button type="submit" value="submit" onClick={handleSubmit}>Book Now!</button>
    </form>
  );
}

export default MovieBookingForm;