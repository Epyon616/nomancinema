import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';

const getData = async (path:string, responseMethod: Dispatch<SetStateAction<never[]>>) => {
  await axios.get(path).then(
    (response: { data: { data: SetStateAction<never[]>; }; }) => {
      responseMethod(response.data.data)
    }
  )
} 

export default getData;