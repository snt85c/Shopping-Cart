import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AttractionShow from "./AttractionShow"
export default function Third({data}){
    const [eventData, setEventData] = useState([]);
    const navigate = useNavigate();
    const APIKEY = "cD2XNWSCGooPNOAAgXStTr5H6ks3ZfmD";
    let params = useParams();


    function SearchEvents(data, setEventData) {
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

    SearchEvents(data,setEventData)

    return (
        <>
        <div className="min-h-full">Second</div>
        <button onClick={()=>navigate("/")}>back to Main</button>
        <AttractionShow eventData={eventData} data={data}/>
        </>
    )
}