import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard.jsx";
import React, { useRef } from "react";
import MovieProgressBar from "./MovieProgressbar.jsx";

function Select({ movies }) {
  return (
    <div
      className={`selectApp ${movies.length === 1 ? "center" : ""}`}
      style={movies.length === 2 ? { width: "70%" } : {}}
    >
      {movies.length === 0 ? <h1>Nothing here buddy</h1> : null}
      {movies.map((movie) => (
        <MovieCard
          key={movie.movieID}
          movieID={movie.movieID}
          fadeOut={false}
          movieData={movie.movieData}
          credits={movie.movieCredits}
        />
      ))}
      <MovieProgressBar />
    </div>
  );
}

Select.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Select;
