import { ShowTimeType } from "../../types";

export type BookingTimesProps = {
  showings: { data: ShowTimeType[] };
  booking: { 
    isPending: boolean;
    mutate: (params: {firstName: string, lastName: string, movieShowingId: number}) => void;
  };
  firstName: string;
  lastName: string;
}