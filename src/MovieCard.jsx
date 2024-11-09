import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";

function MovieCard({ fadeOut, movieData, credits }) {
  return (
    <div className="card-container">
      <Card className={`card  ${fadeOut ? "fade-out" : "fade-in-up"}`}>
        <h1 className="" id="title">
          {movieData.title}
        </h1>

        <Card.Img
          className="cardImg "
          src={`https://image.tmdb.org/t/p/w342${movieData.poster_path}`}
          alt="Movie Poster"
        />
        <div className="year-genre-container">
          <h2 id="year">
            {movieData.release_date ? movieData.release_date.slice(0, 4) : ""}
          </h2>
          <h2 id="genres">
            {movieData.genres
              ? movieData.genres
                  .slice(0, 3)
                  .map((genre) => genre.name)
                  .join(" | ")
              : ""}
          </h2>
        </div>
        <h4>Starring:</h4>
        <div className="year-genre-container">
          <h2 id="cast" className="text pt-3 pb-3 border-top border-bottom">
            {credits.cast
              ? credits.cast
                  .slice(0, 3)
                  .map((actor) => actor.name)
                  .join(", ")
              : ""}
          </h2>
        </div>
      </Card>
      <Card className={`card  ${fadeOut ? "fade-out" : "fade-in-up"}`}>
        <h3 id="director" className="">
          Directed by:{" "}
          {credits.crew
            ? credits.crew.find(
                (member) => member.known_for_department === "Directing"
              )?.name
            : ""}
        </h3>
        <p id="desc" className="text truncated-text">
          {movieData.overview}
        </p>
      </Card>
    </div>
  );
}

MovieCard.propTypes = {
  fadeOut: PropTypes.bool.isRequired,
  movieData: PropTypes.object.isRequired,
  credits: PropTypes.object.isRequired,
};

export default MovieCard;
