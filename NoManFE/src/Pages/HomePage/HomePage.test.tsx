import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

describe('Home', () => {
  it('renders welcome message', () => {
    render(<HomePage />);
    expect(screen.getByText('Welcome To No Man Cinema!')).toBeInTheDocument();
  });

  it('renders as a heading', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Welcome To No Man Cinema!');
  });
});
