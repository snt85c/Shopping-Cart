export default function ShowArtistMetadata({ metadata, topTracks }) {
  let result =
    topTracks.toptracks &&
    topTracks.toptracks.track.map((track, i) => {
      if (i < 5)
        return (
          <div key={i}>
            {i + 1}
            {"# "}
            {track.name}
          </div>
        );
    });
  return (
    <>
      <div className="mx-4 md:w-1/2 flex flex-col font-normal">
        <div>
          {metadata &&
            metadata.artist &&
            metadata.artist.bio.summary
              .replace(/(<([^>]+)>)/gi, "")
              .replace("Read more on Last.fm", "")}
        </div>
        <div className="my-2 md:my-0 text-amber-500 font-extrabold">
          {result ? (
            <span>top tracks on LastFM:</span>
          ) : (
            <span>no information to show from LastFM:</span>
          )}
          <div className="mx-4 text-white">{result}</div>
        </div>
      </div>
    </>
  );
}
