import EventItem from "./ArtistEventItem";
import { useSelector } from "react-redux";
export default  function EventList() {
  const eventData = useSelector((state) => state.reducer.events);
  const options = eventData.map((item, i) => (
    <EventItem data={item} key={i} />
  ));

  return (
    <div className="md:h-[265px] flex flex-col px-5 md:w-1/2 md:overflow-auto bg-black md:bg-opacity-0 cursor-pointer ">
      {options}
    </div>
  );
}