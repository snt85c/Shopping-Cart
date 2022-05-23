import { useEffect } from "react";

const TiketmasterAPIKEY = "cD2XNWSCGooPNOAAgXStTr5H6ks3ZfmD";

const lastfmAPIKEY = "3513bd88ba9816db88a7b53f1090c00a";

export function FetchArtistMetadataFromLastFM(data, setMetadata) {
  useEffect(() => {
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${data.name}&api_key=${lastfmAPIKEY}&format=json`;
    async function getData() {
      const response = await fetch(url, { mode: "cors" });
      const result = await response.json();
      try {
        setMetadata(result);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
    return(()=>getData())
  }, []);
}

export function FetchTopTracksFromLastFM(data, setTopTracks) {
  useEffect(() => {
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getTopTracks&artist=${data.name}&api_key=${lastfmAPIKEY}&format=json`;
    async function getData() {
      const response = await fetch(url, { mode: "cors" });
      const result = await response.json(data);
      try {
        setTopTracks(result);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
    return(()=>getData())
  }, []);
}

//search by Artist(attraction)
export function FetchAttractionToSearchFromTicktmasterAPI(search, setData) {
  useEffect(() => {
    async function getData() {
      if (search !== "") {
        let attractions = [];
        const url = `https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=${search}&countryCode=UK&apikey=${TiketmasterAPIKEY}`;
        const response = await fetch(url, { mode: "cors" });
        const result = await response.json();
        try {
          result._embedded.attractions.forEach((item) => {
            if (item.upcomingEvents._total !== 0) {
              attractions.push(item);
            }
          });
          setData(attractions);
        } catch (e) {
          console.log(e);
        }
      }
    }
    getData();
  }, [search]);
}

//search all the events available for attraction(Artist) id
export function FetchEventsInTicketmasterAPI(data, setEventData) {
  useEffect(() => {
    async function getData() {
      if (data !== undefined) {
        let events = [];
        const url = `https://app.ticketmaster.com/discovery/v2/events.json?attractionId=${data}&apikey=${TiketmasterAPIKEY}`;
        const response = await fetch(url, { mode: "cors" });
        const result = await response.json();
        try {
          result._embedded.events.forEach((item) => {
            events.push(item);
          });
          setEventData(events);
        } catch (e) {
          console.log(e);
        }
      }
    }
    getData();
    return(()=>getData())
  }, [data]);
}

export function FetchSuggestFromTicketmasterAPI(setSuggest) {
  useEffect(() => {
    async function getData() {
      let suggest = [];
      const url = `https://app.ticketmaster.com/discovery/v2/suggest?&countryCode=UK&apikey=${TiketmasterAPIKEY}`;
      const response = await fetch(url, { mode: "cors" });
      const result = await response.json();
      try {
        result._embedded.attractions.forEach((item) => {
          suggest.push(item);
        });
        setSuggest(suggest);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
    return(()=>getData())
  }, []);
}

//finds the best image resolution (for Event.js)
export function indexBestWidthUrl(data) {
  if (data.images !== undefined) {
    return data.images.findIndex((item) => {
      return item.ratio === "3_2";
    });
  }
}

//find the image with the requested ratio(for small icons in searchbaritem)
export function indexBestRatioUrl(ratio, data) {
  if (data.images !== undefined) {
    return data.images.findIndex((item) => {
      return item.ratio === ratio && item.width > 2000;
    });
  }
}

export function convertDate(dateString) {
  var date = new Date(dateString);
  return (
    date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
  );
}
