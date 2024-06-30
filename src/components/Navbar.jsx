import React, { useContext, useState, useEffect, useCallback } from "react";
import logo from "../assets/logo.png";
import Buttons from "./Buttons";
import CheckboxButton from "./CheckboxButton";
import { topics } from "../assets/topics.js";
import { countries } from "../assets/country.js";
import { GlobalContext } from "./GlobalState.jsx";
import { debounce } from "lodash";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const {
    categoryName,
    setCategoryName,
    subTopics,
    setSubTopics,
    countryName,
    setCountryName,
    setQuery
  } = useContext(GlobalContext);

  const topicsArray = topics.data.map((item) => {
    return item.name;
  });
  const countriesArray = countries.data.map((item) => {
    return item;
  });

    const debouncedSetQuery = useCallback(
      debounce((value) => setQuery(value), 300), // Adjust the debounce delay as needed
      []
    );

  useEffect(() => {
    debouncedSetQuery(inputValue);
    return () => {
      debouncedSetQuery.cancel();
    };
  }, [inputValue, debouncedSetQuery]);

  return (
    <nav className="px-6 py-4 relative">
      <div className="flex justify-between items-center flex-wrap gap-5">
        <div className="flex justify-center items-center font-bold text-4xl">
          <span>Read<span className="text-red-500"> IT</span></span><img src={logo} alt="logo" className="h-20"/>
        </div>
        <div className="h-min pb-2 border-b-[1px] flex gap-5 justify-between border-red-500">
          <button>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <input
            type="text"
            onChange={(e) =>setInputValue(e.target.value)}
            className="outline-none border-none"
          />
        </div>
      </div>
      <div className="mt-5 py-5 border-y-[1px] border-gray-500 flex gap-4 overflow-x-scroll ">
        {topicsArray.map((item) => {
          return (
            <Buttons
              category={item.toLowerCase()}
              categoryName={categoryName}
              setCategoryName={setCategoryName}
              key={item}
            />
          );
        })}
        <div className="absolute bottom-[-40px] right-[8%] ">
          <div className="relative">
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="px-2 relative z-10 text-gray-200 py-1 text-lg bg-[#f91616de] rounded-md"
            >
              <i className="fa-solid fa-bars-staggered"></i>
            </button>

            {isVisible && (
              <div className="mt-4 flex flex-col gap-6 absolute z-10  shadow-2xl px-8 py-6 bg-white rounded-3xl -translate-x-[100%] max-h-[300px] overflow-y-scroll">
                <div className="flex flex-col gap-4">
                  <h1 className="text-xl text-gray-600 tracking-wide font-medium">
                    {categoryName}
                  </h1>
                  <div className="flex flex-col gap-2 ml-6">
                    {topics.data.map((item) => {
                      if (
                        item.name.toLowerCase() === categoryName.toLowerCase()
                      ) {
                        {
                          if (item.subtopics.length !== 0) {
                            return item.subtopics.map((sub) => {
                              return (
                                <CheckboxButton
                                  type="catName"
                                  subCategory={sub}
                                  subTopics={subTopics}
                                  setSubTopics={setSubTopics}
                                  key={sub}
                                />
                              );
                            });
                          } else {
                            return (
                              <h1
                                key={item.name}
                                className="font-bold text-[#705252de]"
                              >
                                Empty
                              </h1>
                            );
                          }
                        }
                      }
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <h1 className="text-xl text-gray-600 tracking-wide font-medium">
                    country
                  </h1>
                  <div className="flex flex-col gap-2 ml-6">
                    {countriesArray.map((country) => {
                      return (
                        <CheckboxButton
                          type="countryName"
                          subCategory={country}
                          countryName={countryName}
                          setCountryName={setCountryName}
                          key={country.name}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
