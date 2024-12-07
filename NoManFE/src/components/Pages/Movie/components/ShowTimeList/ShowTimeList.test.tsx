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
      {time: 900 },
      {time: 1400 }
    ];
    
    it('should render the items', () => {
      render(<ShowTimeList showTimes={showTimes}/>);
      expect(screen.queryByText('No Times available')).not.toBeInTheDocument();
      expect(screen.getByText(900)).toBeInTheDocument();
      expect(screen.getByText(1400)).toBeInTheDocument();
    });
  });
});