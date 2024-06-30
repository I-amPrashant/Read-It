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
          <Route path="/" element={<HomeNews/>} exact/>
          <Route path="/business" element={<HomeNews/>} exact/>
          <Route path="/entertainment" element={<HomeNews/>} exact/>
          <Route path="/lifestyle" element={<HomeNews/>} exact/>
          <Route path="/politics" element={<HomeNews/>} exact/>
          <Route path="/science" element={<HomeNews/>} exact/>
          <Route path="/sports" element={<HomeNews/>} exact/>
          <Route path="/technology" element={<HomeNews/>} exact/>
        </Routes>
      </Router>
     </GlobalProvider>
    
  );
}
