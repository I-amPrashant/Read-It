import React, { useContext } from "react";
import NewsItem from "./NewsItem";
import { GlobalContext } from "./GlobalState";
import UseApiCallHook from "./UseApiCallHook";

export default function HomeNews() {
  const { categoryName} = useContext(GlobalContext);
  const {newsArray, totalPage, loading, error}=UseApiCallHook()
 
  const capitalName =
  categoryName.split("")[0].toUpperCase() +
  categoryName.split("").slice(1).join("");

  return (
    <>
       {!error || !newsArray.length===0? (
        loading & !newsArray.length? (
          <div className="px-3 sm:px-8 py-10 h-[400px] flex justify-center items-center">
            <img
              className="h-8"
              src="/src/assets/loading.gif"
              alt="Loading..."
            />
          </div>
        ) : (
          <div className="px-3 sm:px-8 py-10">
            <h1 className="text-center font-bold tracking-wider text-3xl my-5">
              {capitalName}
            </h1>
            <div className="flex flex-wrap">
              {newsArray.map((item, index) => {
                if(index+1===newsArray.length){
                  return <NewsItem newsArray={item} key={index} lastElement={true} totalPage={totalPage} loading={loading}/>
                }else{
                  return <NewsItem newsArray={item} key={index} lastElement={false} totalPage={totalPage}  loading={loading}/>;
                }
              })}
            </div>
            {loading && <p className="my-5"><img src="/src/assets/loading.gif" alt="Loading..." className="h-8 mx-auto"/></p>}
          </div>
        )
      ) : (
        <h1 className="h-[400px] flex justify-center items-center font-bold text-lg sm:text-3xl  text-[#b5b9c0] select-none">
          No results found
        </h1>
      )} 
 
    </>
  );
}
