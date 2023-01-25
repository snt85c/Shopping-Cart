import { convertDate } from "../Services";
export default function EventInfo({data}) {
  return (
    <>
      <div className=" flex flex-col justify-center items-center text-4xl text-center font-extrabold p-3 m-1 basis-1/3">
        {data?.name}
        <br />
        <div className="text-lg">
          {convertDate(data?.dates.start.localDate)} {data?.dates.start.localTime}
        </div>
      </div>
    </>
  );
}
