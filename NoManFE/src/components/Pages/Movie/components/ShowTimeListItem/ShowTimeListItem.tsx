import { ShowTimeType } from "../../../../../types/types";
import './ShowTimeListItem.css';

const ShowTimeListItem = ({ time }:ShowTimeType) => {
  return (
    <li className="show-time">{time}</li>
  )
}

export default ShowTimeListItem;