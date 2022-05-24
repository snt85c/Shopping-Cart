import ArtistEventItem from "./ArtistEventItem";
export default function ArtistEventItemList({ data, setOnScreen, params, eventData }) {
  const options = eventData.map((item, i) => (
    <ArtistEventItem
      data={item}
      setOnScreen={setOnScreen}
      key={i}
      params={params}
    />
  ));

  return (
    <div className="md:h-[300px] flex flex-col px-5 md:w-1/2 md:overflow-auto bg-black md:bg-opacity-0 cursor-pointer ">
      {options}
    </div>
  );
}
