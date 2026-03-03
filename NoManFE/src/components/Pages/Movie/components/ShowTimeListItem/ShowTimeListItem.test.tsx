import { render, screen } from '@testing-library/react';
import ShowTimeListItem from './ShowTimeListItem';

describe('ShowTimeListItem', () => {
  it('should render the showing_time correctly', () => {
    render(<ShowTimeListItem showing_time="2024-03-15 19:00:00" id={1} />);
    expect(screen.getByText('2024-03-15 19:00:00')).toBeInTheDocument();
  });

  it('should render as a list item', () => {
    const { container } = render(<ShowTimeListItem showing_time="2024-03-15 21:00:00" id={2} />);
    expect(container.querySelector('li')).toBeInTheDocument();
  });
});
