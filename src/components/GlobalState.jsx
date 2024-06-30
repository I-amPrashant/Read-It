import React, {useState, createContext, useEffect} from "react";

const initialValue={};
export const GlobalContext=createContext(initialValue);

export const GlobalProvider=({children})=>{
    const [categoryName, setCategoryName] = useState("general");
  const [subTopics, setSubTopics] = useState("");
  const [countryName, setCountryName] = useState({name:"",code:"", language:'en'});
  const [pageNumber, setPageNumber] = useState(1);
  const [query, setQuery] = useState("");

  return (<GlobalContext.Provider 
  value={{
    categoryName, setCategoryName, subTopics, setSubTopics, countryName, setCountryName, pageNumber, setPageNumber, query, setQuery
  }}>
    {children}
  </GlobalContext.Provider>)
}