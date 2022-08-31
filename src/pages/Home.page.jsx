import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import SearchParams from "../components/SearchParams.component";
import Details from "../components/Details.component";

export default function HomePage() {
  return (
    <>
      <BrowserRouter>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Routes>
          <Route path="/details/:id" element={<Details />} />
          <Route path="/" element={<SearchParams />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
