import { Suspense, lazy} from "react";
import { Spinner } from "../Services";
import EventList from "./ArtistEventList";
import { useSelector } from "react-redux";
import ArtistShowSocialsIcons from "./ArtistShowSocialIcons";
export default function ArtistShow({data}) {

  const metadata = useSelector((state) => state.reducer.artistMetadata);
  const topTracks = useSelector((state) => state.reducer.artistTopTracks);
  const ShowArtistMetadata = lazy(() => import("./ShowArtistMetadata"));

  return (
    <>
      return (
      <div className="flex flex-col min-h-[89vh] text-sm font-bold text-white  p-1 select-none ">
        <div>
          <div className=" ml-5 mt-2 text-4xl md:text-6xl">{data.name}</div>
          <div className="ml-5 text-lg">
            {data.classifications[0].genre.name}/
            {data.classifications[0].subGenre.name}
          </div>
          <div className="m-2 ml-5 text-sm ">
            {data.upcomingEvents._total}{" "}
            {data.upcomingEvents._total > 1 ? "events" : "event"}
          </div>
          <div className="flex flex-col md:flex-row-reverse ">
            <Suspense
              fallback={
                <div className="flex flex-col justify-center items-center md:w-1/2">
                  <Spinner />
                </div>
              }
            >
              <ShowArtistMetadata metadata={metadata} topTracks={topTracks} />
            </Suspense>
            <EventList/>
          </div>
        </div>
        <ArtistShowSocialsIcons data={data} />
      </div>
      );
    </>
  );
}
