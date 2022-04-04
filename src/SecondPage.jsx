import { Outlet, useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import SuggestItem from "./SuggestItem";
export default function SecondPage({suggest, setSuggest, onScreen, setOnScreen}){

    const navigate= useNavigate();
    let params = useParams();
    const APIKEY = "cD2XNWSCGooPNOAAgXStTr5H6ks3ZfmD";


  function SearchSuggest(setSuggest) {
    useEffect(() => {
      async function getData() {
        let suggest = [];
        const url = `https://app.ticketmaster.com/discovery/v2/suggest?&countryCode=UK&apikey=${APIKEY}`;
        const response = await fetch(url, { mode: "cors" });
        const result = await response.json();
        try {
          result._embedded.attractions.forEach((item) => {
            suggest.push(item);
          });
          setSuggest(suggest);
        } catch (e) {}
      }
      getData();
    }, []);
  }

  

  function handleClick(item) {
    setOnScreen(item);
    navigate("/third")
    console.log(onScreen, "onScreen");
  }

  const suggestions = suggest.map((item) => (
    <SuggestItem
      data={item}
      key={item.id}
      handleClick={handleClick}
    />
  ));

  SearchSuggest(setSuggest);

    return (
        <>
        {/* <Navbar /> */}
        <div> Second Page </div>
        <div>{suggestions}</div>
        </>
    )
}