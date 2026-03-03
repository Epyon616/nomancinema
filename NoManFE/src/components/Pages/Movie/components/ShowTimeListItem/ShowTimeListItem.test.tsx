import { render, screen } from '@testing-library/react';
import ShowTimeListItem from './ShowTimeListItem';

describe('ShowTimeListItem', () => {
  it('should render the showing_time correctly', () => {
    render(<ShowTimeListItem showing_time="2024-03-15T19:00:00Z" id={1} />);
    expect(screen.getByText('15/03/2024, 19:00:00')).toBeInTheDocument();
  });

  it('should render as a list item', () => {
    const { container } = render(<ShowTimeListItem showing_time="2024-03-15T21:00:00Z" id={2} />);
    expect(container.querySelector('li')).toBeInTheDocument();
  });
});
