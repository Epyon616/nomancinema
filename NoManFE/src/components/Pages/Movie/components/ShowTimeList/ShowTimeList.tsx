import { ShowTimeType } from '../../../../../types/types';
import { ShowTimeListType } from './types';
import ShowTimeListItem from '../ShowTimeListItem';

const ShowTimeList = ({showTimes}: ShowTimeListType) => {
  if (showTimes.length === 0) return (<li>No Times available</li>);
  console.log(showTimes)
  return (
    <>
      {showTimes.map((time:ShowTimeType) => (
        <ShowTimeListItem key={time.id} showing_time={time.showing_time} id={time.id} />
      ))}
    </>  
  )
}

export default ShowTimeList;