import { render, screen, fireEvent } from '@testing-library/react';
import BookAgain from './BookAgain';

describe('BookAgain', () => {
  it('should render the post response message', () => {
    const handleBookAgain = jest.fn();
    render(<BookAgain postResponse="Booking confirmed!" handleBookAgain={handleBookAgain} />);

    expect(screen.getByText('Booking confirmed!')).toBeInTheDocument();
  });

  it('should call handleBookAgain when button is clicked', () => {
    const handleBookAgain = jest.fn();
    render(<BookAgain postResponse="Booking confirmed!" handleBookAgain={handleBookAgain} />);

    const button = screen.getByRole('button', { name: /book again/i });
    fireEvent.click(button);

    expect(handleBookAgain).toHaveBeenCalledTimes(1);
  });
});
