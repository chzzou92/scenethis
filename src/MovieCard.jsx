import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from 'prop-types';

function MovieCard({ fadeOut, movieData, credits}) {
  return (
    <Card
      className={`card  ${fadeOut ? "fade-out" : "fade-in-up"}`}
    >
      <div>
        <h1 className="" id="title">
          {movieData.title}
        </h1>
        <h2 id="year">
          {movieData.release_date ? movieData.release_date.slice(0, 4) : ""}
        </h2>
      </div>
      <Card.Img
        className="cardImg "
        src={`https://image.tmdb.org/t/p/w342${movieData.poster_path}`}
        alt="Movie Poster"
      />
      <h3 id="director" className="">
        {credits.crew
          ? credits.crew.find(
              (member) => member.known_for_department === "Directing"
            )?.name
          : ""}
      </h3>
      <h4 id="cast" className="text pt-3 pb-3 border-top border-bottom">
        {credits.cast
          ? credits.cast
              .slice(0, 3)
              .map((actor) => actor.name)
              .join(", ")
          : ""}
      </h4>
      <p id="desc" className="text truncated-text">
        {movieData.overview}
      </p>
    </Card>
  );
}

MovieCard.propTypes = {
  fadeOut: PropTypes.bool.isRequired,
  movieData: PropTypes.object.isRequired,
  credits: PropTypes.object.isRequired
}

export default MovieCard;
