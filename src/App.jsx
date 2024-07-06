import React, { useState } from "react";
import {BrowserRouter  as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeNews from "./components/HomeNews";
import { GlobalProvider } from "./components/GlobalState";

export default function App() {
  return (
    <GlobalProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<HomeNews key={1}/>} />
          <Route path="/business" element={<HomeNews key={2}/>} />
          <Route path="/entertainment" element={<HomeNews key={3}/>} />
          <Route path="/lifestyle" element={<HomeNews key={4}/>} />
          <Route path="/politics" element={<HomeNews key={5}/>} />
          <Route path="/science" element={<HomeNews key={6}/>} />
          <Route path="/sports" element={<HomeNews key={7}/>} />
          <Route path="/technology" element={<HomeNews key={8}/>} />
        </Routes>
      </Router>
     </GlobalProvider>
    
  );
}
