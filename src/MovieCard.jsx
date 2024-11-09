import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { useState } from "react";

function MovieCard({ movieData, credits }) {
  const [cardFlip, setCardFlip] = useState(false);

  return (
    <div className="flip-container">
      <div className="flip-content">
        <Card className={`card front ${cardFlip ? "flipCard" : ""}`}>
          <div id="flip-icon" onClick={() => setCardFlip(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
            </svg>
          </div>

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
          </div>
        </Card>
        <Card className={`card back`}>
          <div id="flip-icon" onClick={() => setCardFlip(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>
          </div>

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
          </div>
        </Card>
      </div>
    </div>
      // <Card className={`card  ${fadeOut ? "fade-out" : "fade-in-up"}`}>
      //   <h3 id="director" className="">
      //     Directed by:{" "}
      //     {credits.crew
      //       ? credits.crew.find(
      //           (member) => member.known_for_department === "Directing"
      //         )?.name
      //       : ""}
      //   </h3>
      //   <p id="desc" className="text truncated-text">
      //     {movieData.overview}
      //   </p>
      // </Card>
    // </div>
  );
}

MovieCard.propTypes = {
  movieData: PropTypes.object.isRequired,
  credits: PropTypes.object.isRequired,
};

export default MovieCard;
