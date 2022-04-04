import { BsSpotify, BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
export default function AttractionShowIcons({data}){
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