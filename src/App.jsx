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
          <Route path="/Read-It/" element={<HomeNews key={1}/>} />
          <Route path="/Read-It/business" element={<HomeNews key={2}/>} />
          <Route path="/Read-It/entertainment" element={<HomeNews key={3}/>} />
          <Route path="/Read-It/lifestyle" element={<HomeNews key={4}/>} />
          <Route path="/Read-It/politics" element={<HomeNews key={5}/>} />
          <Route path="/Read-It/science" element={<HomeNews key={6}/>} />
          <Route path="/Read-It/sports" element={<HomeNews key={7}/>} />
          <Route path="/Read-It/technology" element={<HomeNews key={8}/>} />
        </Routes>
      </Router>
     </GlobalProvider>
    
  );
}
