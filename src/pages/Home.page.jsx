import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import ThemeContext from "../context/ThemeContext";

import SearchParams from "../components/SearchParams.component";
import Details from "../components/Details.component";

export default function HomePage() {
  const theme = useState("gold");
  return (
    <>
      <header>
        <Link to="/">Adopt Me!</Link>
      </header>
      <ThemeContext.Provider value={theme}>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </ThemeContext.Provider>
    </>
  );
}
