import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "./GlobalState";

export default function UseApiCallHook() {
  const [newsArray, setNewsArray] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { categoryName, subTopics, countryName, pageNumber, query } =
    useContext(GlobalContext);

  useEffect(() => {
    setNewsArray([]);
  }, [query, subTopics, countryName, categoryName]);

  useEffect(() => {
    async function getNews() {
      const newCategoryName =
      categoryName.split("")[0].toUpperCase() +
      categoryName.split("").slice(1).join("");

    const params = { limit: "10", page: `${pageNumber}`, language: "en" };

    if (query) {
      params.query = query;
    } else {
      if (subTopics.length != 0) {
        let newSubTopics =
          subTopics.split("")[0].toUpperCase() +
          subTopics.split("").slice(1).join("");
        params.topic = newSubTopics;
      } else {
        params.topic = newCategoryName;
      }
      if(countryName){
        params.country=countryName.code
        params.language=countryName.language
      }
    }

    // console.log(params)
    const options = {
      method: "GET",
      url: query
        ? "https://news-api14.p.rapidapi.com/v2/search/articles"
        : "https://news-api14.p.rapidapi.com/v2/trendings",
      params: params,
      headers: {
        "x-rapidapi-key": "2be32897c5msh4f8a6d0ae6c8a61p1211b7jsn6677ed9d6e74",
        "x-rapidapi-host": "news-api14.p.rapidapi.com",
      },
    };

      try {
        setLoading(true);
        setError(false);
        const response = await axios.request(options);
        console.log(response.data.data)
        setTotalPage(response.data.totalPages);
        setLoading(false);

        setNewsArray(prevArray=>{
          const uniqueData=response.data.data.filter(newItem=>!prevArray.some(existingItem=>existingItem.title===newItem.title));
          return [...prevArray, ...uniqueData];
  
        })
       
      } catch (error) {
        console.error(error);
        setError(true);
      }
    }
    getNews();
  }, [query, categoryName, subTopics, countryName, pageNumber]);

  return { newsArray, totalPage, loading, error };
}
