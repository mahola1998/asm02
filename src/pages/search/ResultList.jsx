import React, { useState, useEffect } from "react";

import styles from "./ResultList.module.css";
import MovieItem from "../browse/component/MovieItem.jsx";
import Detail from "../browse/component/Detail";

export default function ResultList(props) {
  const [movieDetail, setMovieDetail] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleMovieDetail = (data) => {
    setMovieDetail(data);
    if (movieDetail != data && !isOpen) {
      setIsOpen(!isOpen);
    } else if (movieDetail === data || movieDetail === null) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <div className={styles.moviesList}>
        <h2>Search results</h2>
        <div className={styles.moviesList__wrapper}>
          <ul className={styles.listSearch}>
            {props.movies &&
              props.movies.map((movie) => (
                <MovieItem
                  key={movie.id}
                  movie={movie}
                  img={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  poster={true}
                  onGetMovieDetail={handleMovieDetail}
                />
              ))}
          </ul>
        </div>
      </div>
      {isOpen && <Detail movie={movieDetail} />}
    </div>
  );
}
