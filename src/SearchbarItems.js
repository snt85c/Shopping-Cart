import { indexBestWidthUrl } from "./Services";

export default function SearchbarItems({
  data,
  handleClickSearch,
  setDisplay,
}) {
  return (
    <>
      <div
        className="flex-row flex p-1 border border-white hover:border-amber-500 bg-black cursor-pointer  hover:bg-gray-800 hover:text-amber-500"
        onClick={(event) => {
          handleClickSearch(event, data);
          setDisplay("none");
        }}
      >
        <div className=" flex flex-col">
          <div className="flex w-40  text-sm  ">{data.name}</div>
          <div className="flex w-40 text-sm ">
            {data.upcomingEvents._total} events
          </div>
        </div>
          <img className=" flex m-1 w-12 h-full object-contain" alt="" src={data.images[indexBestWidthUrl(data)].url}></img>
      </div>
    </>
  );
}
