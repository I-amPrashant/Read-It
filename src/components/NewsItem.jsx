import React, {useContext, useCallback, useRef} from "react";
import { GlobalContext } from "./GlobalState";
import { Link } from "react-router-dom";

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};
export default function NewsItem(props) {
  const {pageNumber, setPageNumber } = useContext(GlobalContext);
  
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (props.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          
          if(pageNumber<=props.totalPage){
            debounce(() => {
              setPageNumber((prevPageNumber) => prevPageNumber + 1);
            }, 1000)(); // Adjust the debounce delay as needed
          } 
        }
      });
      if (node) observer.current.observe(node);
    },[props.loading]);
  return (
    <>
      {props.lastElement ? (
        <div
          ref={lastElementRef}
          className="relative basis-full sm:basis-1/2 lg:basis-1/3 px-2 py-5"
        >
          <div>
            <img
              src={
                props.newsArray.thumbnail
                  ? props.newsArray.thumbnail
                  : "https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png"
              }
              alt="thumbnail"
              className="w-full object-cover h-auto sm:h-[250px]"
            />
          </div>
          <h2 className="text-[#abababde] text-base mt-5 font-semibold tracking-wide ">
            {props.newsArray.date
              ? props.newsArray.date.slice(0, 10)
              : "2024-05-23"}
          </h2>
          <h1 className="text-2xl font-bold text-gray-900 hover:text-red-600 duration-150 transition-all  ease-linear hover:underline mt-1">
            <Link to={props.newsArray.url}>
              {props.newsArray.title.length > 60
                ? `${props.newsArray.title.slice(0, 60) + "..."}`
                : props.newsArray.title}
            </Link>
          </h1>
          <h3 className="text-gray-900 font-semibold text-base mt-2">
            Author- {props.newsArray.authors[0]}
          </h3>
        </div>
      ) : (
        <div className="relative basis-full sm:basis-1/2 lg:basis-1/3 px-2 py-5">
          <div>
            <img
              src={
                props.newsArray.thumbnail
                  ? props.newsArray.thumbnail
                  : "https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeholder-738.png"
              }
              alt="thumbnail"
              className="w-full object-cover h-auto sm:h-[250px]"
            />
          </div>
          <h2 className="text-[#abababde] text-base mt-5 font-semibold tracking-wide ">
            {props.newsArray.date
              ? props.newsArray.date.slice(0, 10)
              : "2024-05-23"}
          </h2>
          <h1 className="text-2xl font-bold text-gray-900 hover:text-red-600 duration-150 transition-all  ease-linear hover:underline mt-1">
            <Link to={props.newsArray.url}>
              {props.newsArray.title.length > 60
                ? `${props.newsArray.title.slice(0, 60) + "..."}`
                : props.newsArray.title}
            </Link>
          </h1>
          <h3 className="text-gray-900 font-semibold text-base mt-2">
            Author- {props.newsArray.authors[0]}
          </h3>
        </div>
      )}
    </>
  );
}
