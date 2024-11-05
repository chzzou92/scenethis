import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from 'prop-types';
import MovieCard from "./MovieCard.jsx";

function Select({ movies }) {



  return (
    <div className={`selectApp ${movies.length === 1 ? "center" : ""}`} style={movies.length===2 ? {width: "70%"} : {}}>
      {movies.length === 0 ? <h1>Nothing here buddy</h1> : null}
      {movies.slice(0, 3).map((movie) => (
        <MovieCard
          key={movie.movieID}
          movieID={movie.movieID}
          fadeOut={false}
          movieData={movie.movieData}
          credits={movie.movieCredits}
        />
      ))}
    </div>
  );
}

Select.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Select;
