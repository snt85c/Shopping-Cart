import { useEffect } from "react";

const APIKEY = "cD2XNWSCGooPNOAAgXStTr5H6ks3ZfmD"

//search by Artist(attraction)
export function SearchAttraction(search, setData) {
    useEffect(() => {
        async function getData() {
            if (search !== "") {
                let attractions = []
                const url = `https://app.ticketmaster.com/discovery/v2/attractions.json?keyword=${search}&countryCode=UK&apikey=${APIKEY}`
                const response = await fetch(url, { mode: "cors" })
                const result = await response.json()
                try {
                    result._embedded.attractions.forEach((item)=>{
                        if(item.upcomingEvents._total !== 0){
                            attractions.push(item)
                        }
                    })
                    setData(attractions)
                } catch (e) {}
            }
        }
        getData()
    }, [search]);
}

//search all the events available for attraction(Artist) id
export function SearchEvents(data, setEventData) {
    useEffect(() => {
        async function getData() {
            if (data !== undefined) {
                let events = []
                const url = `https://app.ticketmaster.com/discovery/v2/events.json?attractionId=${data.id}&apikey=${APIKEY}`
                const response = await fetch(url, { mode: "cors" })
                const result = await response.json()
                try {
                    result._embedded.events.forEach((item)=>{
                        events.push(item)
                    })
                    setEventData(events)
                } catch (e) {}
            }
        }
        getData()
    }, [data])
}

export function SearchSuggest(setSuggest){
    useEffect(()=>{
        async function getData(){
            let suggest = [];
            const url = `https://app.ticketmaster.com/discovery/v2/suggest?&countryCode=UK&apikey=${APIKEY}`
            const response = await fetch(url, { mode: "cors" })
            const result = await response.json()
            try{
                result._embedded.attractions.forEach((item)=>{
                    suggest.push(item)
                })
                setSuggest(suggest)
            }catch(e){}
        }
        getData()
    },[])

}


//finds the best image resolution (for Event.js)
export function indexBestWidthUrl(data) {
    if (data.images !== undefined) {
        return data.images.findIndex((item) => {
            return item.ratio === "3_2"
        });
    }
}

//find the image with the requested ratio(for small icons in searchbaritem)
export function indexBestRatioUrl(ratio,data) {
    if (data.images !== undefined) {
      return data.images.findIndex((item) => {
        return item.ratio === ratio && item.width > 2000;
      });
    }
  }

  export function convertDate(dateString) {
    var date = new Date(dateString);
    return date.getDate()+"."+(date.getMonth() + 1)+"."+date.getFullYear();
}
