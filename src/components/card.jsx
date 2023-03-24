import React from "react";

function Card({ imgSrc, snippet, source, title, lastUpdated, url }) {
  return (
    <>
      <div className="flex flex-row items-center mb-6  border-b border-black rounded md:flex-row md:max-w-xl hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="flex flex-col justify-between w-96 p-3 font-bold text-bg-neutral-900  leading-normal">
          <div className="flex flex-row mb-2"></div>
          <div className="text-sm md:text-base dark:text-slate-100">
            {source}
          </div>

          <div className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">
            {title}
          </div>
          <div className="mb-1 font-normal text-gray-700 dark:text-gray-400">
            {snippet}
          </div>

          <div className="text-gray-500 font-bold text-sm ">{lastUpdated}</div>
        </div>

        <img
          className="object-cover w-full rounded-lg h-24 w-24 md:h-32 md:w-32 md:rounded-none md:rounded-lg"
          src={imgSrc}
          alt="Loading"
        />
      </div>
    </>
  );
}

export default Card;
