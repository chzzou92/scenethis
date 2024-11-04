import "bootstrap/dist/css/bootstrap.min.css";
import MovieCard from "./MovieCard.jsx";

function Select({ movies }) {
  //console.log(movies);

  // console.log(currentMovie.credits);

  return (
    <div className="selectApp fixed-height-card">
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
    </div>
  );
}
export default Select;
