import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  it('renders welcome message', () => {
    render(<Home />);
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
  });

  it('renders as a heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Welcome!');
  });
});
