import React from "react";
import styles from "./MovieItem.module.css";

export default function MovieItem(props) {
  const clickGetDetailHandler = () => {
    props.onGetMovieDetail(props.movie);
  };

  return (
    <li className={props.poster ? styles.movieItemPoster : styles.movieItem}>
      <img src={props.img} onClick={clickGetDetailHandler} alt="poster"></img>
    </li>
  );
}
