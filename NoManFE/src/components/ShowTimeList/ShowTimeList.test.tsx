import { screen, render } from "@testing-library/react";
import ShowTimeList from "./ShowTimeList";

describe('ShowTimeList', () => {
  describe('When an empty array is passed', () => {
    it('should render a message', () => {
      render(<ShowTimeList showTimes={[]}/>);
      expect(screen.getByText('No Times available')).toBeInTheDocument();
    });
  });

  describe('When an array of values is passed', () => {
    const showTimes = [
      { id: 1, showing_time: '2024-03-15T19:00:00Z' },
      { id: 2, showing_time: '2024-03-15T21:00:00Z' }
    ];
    
    it('should render the items', () => {
      render(<ShowTimeList showTimes={showTimes}/>);
      expect(screen.queryByText('No Times available')).not.toBeInTheDocument();
      expect(screen.getByText('15/03/2024, 19:00:00')).toBeInTheDocument();
      expect(screen.getByText('15/03/2024, 21:00:00')).toBeInTheDocument();
    });
  });
});