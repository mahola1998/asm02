import React, { useState } from "react";

import Navbar from "../browse/Navbar";
import SearchForm from "./SearchForm";
import ResultList from "./ResultList";

const Search = () => {
  const [movies, setMovies] = useState();

  const getDataHandler = (data) => {
    setMovies(data.results);
  };

  return (
    <div className="app">
      <Navbar />
      <SearchForm onGetData={getDataHandler} url="fetchSearch" />

      <ResultList page="search" movies={movies} />
    </div>
  );
};

export default Search;
