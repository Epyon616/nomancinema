import { MovieShowTimeType, bookingDataType } from "../../../../../types/types"

export type MovieBookingDataType = {
  firstName: string,
  lastName: string,
  movieShowingId: number
}

export type MovieBookingFormType = {
  times: MovieShowTimeType[],
  booking: bookingDataType,
  handleChange: (e: unknown) => void,
  handleSubmit: (e: unknown) => void
}

