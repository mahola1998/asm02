import { useState } from "react";

export function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const API_KEY = "3c713525a43608c519404f67f20755c2";
  const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
  };

  const sendRequest = async (category, query) => {
    setIsLoading(true);
    setError(null);
    let url;
    if (query) {
      url = `https://api.themoviedb.org/3${
        requests[`${category}`]
      }&query=${query}`;
    } else if (requests[`${category}`]) {
      url = `https://api.themoviedb.org/3${requests[`${category}`]}`;
    } else {
      url = `https://api.themoviedb.org/3${`/movie/${category}/videos?api_key=${API_KEY}`}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      const data = await response.json();
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(err.message || "Somethign went wrong");
      setIsLoading(false);
    }
  };

  return { isLoading, error, sendRequest };
}
