import { ShowTimeType } from "../../types"

export type BookingFormType = {
  showingsQuery: { data: ShowTimeType[] };
  movieId: number;
}