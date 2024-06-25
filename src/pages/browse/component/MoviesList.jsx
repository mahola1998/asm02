import React, { useState, useEffect } from "react";

import { useHttp } from "../../../hooks/useHttp";
import styles from "./MoviesList.module.css";
import MovieItem from "./MovieItem";
import Detail from "./Detail";

export default function MoviesList(props) {
  const { isLoading, sendRequest: getMovie } = useHttp();
  const [movies, setMovies] = useState([]);
  const [original, setOriginal] = useState(false);
  const [movieDetail, setMovieDetail] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovie(props.url);
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (props.useFor === "original") {
      setOriginal(true);
    }
    fetchData();
  }, [props.query]);

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
        {isLoading && <h1>Movie is loading</h1>}
        <h2>{original ? "" : props.useFor}</h2>
        <div className={styles.moviesList__wrapper}>
          <ul className={styles.listBrowse}>
            {movies.map((movie) => (
              <MovieItem
                key={movie.id}
                movie={movie}
                img={
                  original
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                }
                poster={original}
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
