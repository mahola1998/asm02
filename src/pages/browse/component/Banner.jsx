import React, { useState, useEffect } from "react";

import { useHttp } from "../../../hooks/useHttp";
import styles from "./Banner.module.css";

export default function Banner() {
  const { isLoading, error, sendRequest: getMovie } = useHttp();
  const [movie, setMovie] = useState({});
  const [bgImage, setBgImage] = useState();
  const [overview, setOverview] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovie("fetchNetflixOriginals");
        const pickMovie =
          data.results[Math.floor(Math.random() * data.results.length - 1)];
        setMovie(pickMovie);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (movie && movie.backdrop_path) {
      setBgImage(`https://image.tmdb.org/t/p/original${movie.backdrop_path}`);
    }
    if (movie && movie.overview) {
      setOverview(movie.overview);
    }
  }, [movie]);

  return (
    <div
      className={styles.banner}
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "500px",
        width: "100%",
        position: "relative",
      }}
    >
      <div className={styles.content}>
        {isLoading && <h1>Movie is loading</h1>}
        {error ? <p>{error}</p> : undefined}
        <h1>{movie.name}</h1>
        <div>
          <button>Play</button>
          <button>My List</button>
        </div>
        <p>{overview}</p>
      </div>
    </div>
  );
}
