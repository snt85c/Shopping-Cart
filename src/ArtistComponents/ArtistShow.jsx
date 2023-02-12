import { Suspense, lazy } from "react";
import { Spinner } from "../Services";
import EventList from "./ArtistEventList";
import { useSelector } from "react-redux";
import ArtistShowSocialsIcons from "./ArtistShowSocialIcons";
import Footer from "../Footer";
export default function ArtistShow({ data }) {
  const metadata = useSelector((state) => state.reducer.artistMetadata);
  const topTracks = useSelector((state) => state.reducer.artistTopTracks);
  const ShowArtistMetadata = lazy(() => import("./ShowArtistMetadata"));

  return (
    <>
      <div className="flex flex-col justify-between min-h-[85.1vh] text-sm font-bold text-white  select-none ">
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
                <div role="status" className="max-w-sm animate-pulse mx-5 py-5">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <span className="sr-only">Loading...</span>
                </div>
              }
            >
              <ShowArtistMetadata metadata={metadata} topTracks={topTracks} />
            </Suspense>
            <EventList />
          </div>
        </div>
        <ArtistShowSocialsIcons data={data} />
      </div>
    </>
  );
}
