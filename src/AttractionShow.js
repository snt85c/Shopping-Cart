import { indexBestRatioUrl } from "./Services";
import { convertDate } from "./Services";
import { useNavigate } from "react-router-dom";
import { BsSpotify, BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";


export default function AttractionShow({ data, eventData, handleClickSearch }) {


  function EventList({ data}) {
    function EventItem({ data }) {
      const navigate = useNavigate()
      return (
        <div
          className="border-2 rounded border-gray-600 mb-1 pl-1 py-2 hover:border-amber-500"
          onClick={() => navigate(`/third`)}
        >
          <div className="flex flex-col text-sm flex-wrap my-0.5">
            <div className="text-white">
              {convertDate(data.dates.start.localDate)}
            </div>
            <div className="flex flex-row pt-1 text-xs text-gray-400">
              {data._embedded.venues[0].name} {" - "}
              <div className="text-white ">
                {data._embedded.venues[0].city.name}
              </div>
              {" - "}
              {data._embedded.venues[0].country.countryCode}
            </div>
          </div>
        </div>
      );
    }
  
    const options = data.map((item, i) => (
      <EventItem data={item} key={i} />
    ));
  
    return (
      <div className=" flex flex-col mx-5 h-80 bg-gray-800 bg-opacity-50 overflow-auto cursor-pointer mb-4 ">
        {options}
      </div>
    );
  }

  function AttractionShowIcons({data}){
    return (

        data.externalLinks !== undefined?(
        <>
         <a href={data.externalLinks.homepage?data.externalLinks.homepage[0].url:"no url"} style={{ padding:"1%"}} >
          <AiOutlineHome className="text-white  object-contain w-12 h-12 pl-2 " style={{display:data.externalLinks.homepage?"flex":"none"}} />
        </a>
        <a href={data.externalLinks.spotify?data.externalLinks.spotify[0].url:"no url"}style={{ padding:"1%",display:data.externalLinks.spotify?"flex":"none"}} target="_blank" rel="noreferrer">
          <BsSpotify className="text-white  object-contain w-12 h-12 pl-2 " style={{}}/>
        </a>
        <a href={data.externalLinks.facebook?data.externalLinks.facebook[0].url:"no url"}style={{ padding:"1%", display:data.externalLinks.facebook?"flex":"none"}} target="_blank" rel="noreferrer">
        <BsFacebook className="text-white object-contain w-12 h-12 pl-2 " style={{}}/>
        </a>
        <a href={data.externalLinks.instagram?data.externalLinks.instagram[0].url:""}style={{ padding:"1%",display:data.externalLinks.instagram?"flex":"none"}} target="_blank" rel="noreferrer">
        <BsInstagram className="text-white object-contain w-12 h-12 pl-2 " style={{}}/>
        </a>
        <a href={data.externalLinks.twitter?data.externalLinks.twitter[0].url:""}style={{ padding:"1%",display:data.externalLinks.twitter?"flex":"none"}} target="_blank" rel="noreferrer">
        <BsTwitter className="text-white object-contain w-12 h-12 pl-2 " style={{}}/>
        </a>
        <a href={data.externalLinks.youtube?data.externalLinks.youtube[0].url:""}style={{ padding:"1%",display:data.externalLinks.youtube?"flex":"none"}} target="_blank" rel="noreferrer">
        <BsYoutube className="text-white object-contain w-12 h-12 pl-2 " style={{}}/>
        </a>
        </>):(<></>)
    )
}


  return (
    <div
      className="flex flex-col text-sm font-bold text-white image"
      style={{
        background: `linear-gradient(to right, black 20%, rgba(0, 0, 0, 0), black), url(${
          data.images[indexBestRatioUrl("16_9", data)].url
        }) no-repeat 50% 30%`,
      }}
    >
      <div >
        <div className="mt-5 ml-5 text-4xl md:text-6xl">{data.name}</div>
        <div className="ml-5 text-lg">
          {data.classifications[0].genre.name}/
          {data.classifications[0].subGenre.name}
        </div>
        <div className="m-5 mb-0 text-md ">
          {data.upcomingEvents._total}{" "}
          {data.upcomingEvents._total > 1 ? "events" : "event"}
        </div>
          <EventList data={eventData} handleClickSearch={handleClickSearch} />
      </div>
      <div className="flex justify-center pb-1"
        style={{
          display: data.externalLinks ? "flex" : "none",
        }}
      >
        <AttractionShowIcons data={data} />
      </div>
    </div>
  );
}
