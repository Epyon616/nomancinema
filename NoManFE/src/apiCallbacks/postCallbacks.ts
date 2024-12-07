import axios from "axios";
import { bookingDataType } from "../types/types";


const createBooking = async (path: string,  data: bookingDataType, responseMethod: (arg0: string) => void) => {
  await axios.post(path, data)
  .then((response) =>  {
    responseMethod(response.data);
  })
  .catch((error) =>  {
    console.error(error);
  });
}

export default createBooking;
