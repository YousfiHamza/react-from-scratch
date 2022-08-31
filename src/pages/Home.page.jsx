import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import SearchParams from "../components/SearchParams.component";
import Details from "../components/Details.component";

import ThemeContext from "../context/ThemeContext";

export default function HomePage() {
  const theme = useState("gold");
  return (
    <>
      <BrowserRouter>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <ThemeContext.Provider value={theme}>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
        </ThemeContext.Provider>
      </BrowserRouter>
    </>
  );
}
