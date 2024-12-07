import { ShowTimeType } from "../../../../../types/types";
import { ShowTimeListType } from "./types";
import ShowTimeListItem from "../ShowTimeListItem";

const ShowTimeList = ({showTimes}: ShowTimeListType) => {
  if (showTimes.length === 0) return (<li>No Times available</li>);

  return (
    <>
      {showTimes.map((time:ShowTimeType) => (
        <ShowTimeListItem key={time.time} time={time.time} />
      ))}
    </>  
  )
}

export default ShowTimeList;