import React, { useEffect, useState } from "react";

import { useHttp } from "../../../hooks/useHttp";
import styles from "./Detail.module.css";

export default function Detail(props) {
  const { isLoading, error, sendRequest: getMovie } = useHttp();
  const [movieDetailImg, setMovieDetailImg] = useState([]);
  const [keyMovie, setKeyMovie] = useState("");

  useEffect(() => {
    setKeyMovie("");
    const fetchData = async () => {
      try {
        const data = await getMovie(props.movie.id);
        setMovieDetailImg(data.results);
      } catch (err) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.movie.id]);

  useEffect(() => {
    for (let i = 0; i < movieDetailImg.length; i++) {
      if (movieDetailImg[i].type === "Trailer") {
        setKeyMovie(movieDetailImg[i].key);
        return;
      } else if (movieDetailImg[i].type === "Teaser") {
        setKeyMovie(movieDetailImg[i].key);
      }
    }
  }, [movieDetailImg]);

  return (
    <div className={styles.container}>
      {isLoading && <h1>Movie is loading</h1>}
      <div className={styles.detail}>
        <h1>{props.movie.title || props.movie.name}</h1>
        <div className={styles.rate}>
          <h3>
            Release Date:{" "}
            {props.movie.release_date || props.movie.first_air_date}
          </h3>
          <h3>Rate: {props.movie.vote_average} / 10</h3>
        </div>
        <p>{props.movie.overview}</p>
      </div>
      {keyMovie ? (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${keyMovie}`}
        ></iframe>
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/original${props.movie.backdrop_path}`}
        ></img>
      )}
    </div>
  );
}
