import {
    BsSpotify,
    BsFacebook,
    BsInstagram,
    BsTwitter,
    BsYoutube,
  } from "react-icons/bs";
  import { AiOutlineHome } from "react-icons/ai";
export default function ArtistShowSocialsIcons({data}) {
    const icons = [
      AiOutlineHome,
      BsSpotify,
      BsInstagram,
      BsFacebook,
      BsTwitter,
      BsYoutube,
    ];
    const dataExternaLinksNames = [
      "homepage",
      "spotify",
      "instagram",
      "facebook",
      "twitter",
      "youtube",
    ];
    const result = dataExternaLinksNames.map((name, i) => {
      if (data.externalLinks && data.externalLinks[name]) {
        let IconType = icons[i];
        return (
          <div key={i} className="">
            <a href={data.externalLinks[name][0].url} style={{ padding: "1%" }}>
              <IconType className="text-white h-12 w-12 object-contain pl-2 hover:text-amber-500 duration-100 " />
            </a>
          </div>
        );
      }
    });
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row">{result}</div>
      </div>
    );
  }