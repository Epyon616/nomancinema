import { render, screen } from '@testing-library/react';
import ShowTimeListItem from './ShowTimeListItem';

describe('ShowTimeListItem', () => {
  it('should render the time correctly', () => {
    render(<ShowTimeListItem time={1900} />);
    expect(screen.getByText('1900')).toBeInTheDocument();
  });

  it('should render as a list item', () => {
    const { container } = render(<ShowTimeListItem time={2130} />);
    expect(container.querySelector('li')).toBeInTheDocument();
  });
});
