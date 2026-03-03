import { ShowTimeType } from "../../../../../types/types"

export type BookingFormType = {
  showingsQuery: { data: ShowTimeType[] };
  movieId: number;
}