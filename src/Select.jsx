import "bootstrap/dist/css/bootstrap.min.css";
import { getSelectedMovies } from "./App";
import MovieCard from "./MovieCard.jsx";

function Select({ empty }) {
  const movies = getSelectedMovies();
  console.log(movies);
  const currentMovie = movies[0];
  console.log(currentMovie);
  return (
    <div className="app container fixed-height-card">
      {empty ? (
        <h1>nothing here buddy</h1>
      ) : (
        <MovieCard
          fadeOut={false}
          movieData={currentMovie.movieData}
          credits={currentMovie.credits}
        />
      )}
    </div>
  );
}
export default Select;
