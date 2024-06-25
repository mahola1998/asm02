import React from "react";
import Navbar from "./Navbar";
import Banner from "./component/Banner";

import MoviesList from "./component/MoviesList";

function Browse() {
  return (
    <div className="app">
      <div>
        <Navbar />
        <Banner />
        <MoviesList useFor="original" url="fetchNetflixOriginals" />
        <MoviesList useFor="Xu hướng" url="fetchTrending" />
        <MoviesList useFor="Xếp hạng cao" url="fetchTopRated" />
        <MoviesList useFor="Hành động" url="fetchActionMovies" />
        <MoviesList useFor="Hài" url="fetchComedyMovies" />
        <MoviesList useFor="Kinh dị" url="fetchHorrorMovies" />
        <MoviesList useFor="Lãng mạn" url="fetchRomanceMovies" />
        <MoviesList useFor="Tài liệu" url="fetchDocumentaries" />
      </div>
    </div>
  );
}

export default Browse;
