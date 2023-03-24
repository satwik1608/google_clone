import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

import { useStateContext } from "../contexts/StateContextProvider";
import { Loading } from "./Loading";
import Card from "./card";
require("dotenv").config();

export const Results = () => {
  const { results, loading, getResults, searchTerm } = useStateContext();
  const location = useLocation();
  const APIKEY = "641d8bc5ea5937e471ab6783";
  useEffect(() => {
    console.log(searchTerm);
    if (searchTerm !== "") {
      if (location.pathname === "/videos") {
        getResults(`/videos?api_key=${APIKEY}&q=${searchTerm}&gl=us`);
      } else if (location.pathname == "/news") {
        getResults(`/news?api_key=${APIKEY}&q=${searchTerm}&gl=us`);
      } else if (location.pathname == "/images") {
        getResults(`/images?api_key=${APIKEY}&q=${searchTerm}&gl=us`);
      } else {
        getResults(`/search?api_key=${APIKEY}&q=${searchTerm}&gl=us`);
      }
    }
  }, [searchTerm, location.pathname]);

  if (loading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return (
        <div className="sm:px-56 flex flex-wrap justify-between space-y-6">
          {results?.organic_results?.map(({ link, title, snippet }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700  ">
                  {title}
                </p>
                <p className="text-sm hover:underline dark:text-blue-300   ">
                  {snippet}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.image_results?.map(({ link, title, image }, index) => (
            <a
              link={link}
              target="_blank"
              key={index}
              rel="noreferrer"
              className="sm:p-3 p-5"
            >
              <img src={image} alt={title} loading="lazy" />
              <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );
    case "/news":
      return (
        <div className="sm:px-56 flex flex-wrap justify-between space-y-6">
          {results?.news_results?.map(
            ({ imgSrc, snippet, source, title, lastUpdated, url }, index) => (
              <a href={url} target="_blank" rel="noreferrer">
                <Card
                  imgSrc={imgSrc}
                  snippet={snippet}
                  source={source}
                  title={title}
                  lastUpdated={lastUpdated}
                />
              </a>
            )
          )}
        </div>
      );
    case "/videos":
      return (
        <div className="flex flex-wrap ">
          {results?.video_results?.map(({ link, title }, index) => (
            <div key={index} className="p-2">
              <h3>{title}</h3>
              <ReactPlayer
                url={link}
                light={true}
                controls
                width="355px"
                height="200px"
              />
            </div>
          ))}
        </div>
      );
    default:
      return "Error...";
  }
};
