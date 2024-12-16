import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard.jsx";
import React, { useRef } from "react";
import MovieProgressBar from "./MovieProgressbar.jsx";

function Select({ movies }) {
  return (
    <>
      <div
        className={`selectApp ${movies.length === 1 ? "center" : ""}`}
        style={{
          minWidth: `${(movies.length + 1) * 4 + movies.length * 30}em`,
        }}
      >
        {movies.length === 0 ? <h1>Empty Cart</h1> : null}
        {movies.map((movie) => (
          <MovieCard
            key={movie.movieID}
            movieID={movie.movieID}
            fadeOut={false}
            movieData={movie.movieData}
            credits={movie.movieCredits}
            trailer={movie.trailer}
            provider={movie.provider}
          />
        ))}
      </div>
      <MovieProgressBar />
    </>
  );
}

Select.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Select;
