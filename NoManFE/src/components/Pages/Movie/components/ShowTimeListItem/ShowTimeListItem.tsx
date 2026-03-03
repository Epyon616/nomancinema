import { ShowTimeType } from "../../../../../types/types";
import './ShowTimeListItem.css';

const ShowTimeListItem = ({ showing_time }:ShowTimeType) => {
  return (
    <li className="show-time">{new Date(showing_time).toLocaleString("en-GB", {})}</li>
  )
}

export default ShowTimeListItem;