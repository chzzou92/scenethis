import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { langToLanguage } from "./countryLangaugeData";
import { countryToCountry } from "./countryLangaugeData";

function MovieCard({ movieData, credits, image, trailer, provider }) {
  const [cardFlip, setCardFlip] = useState(false);
  const [showVideo, setVideo] = useState({});
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const baseUrl = "https://image.tmdb.org/t/p/w92";

  useEffect(() => {
    if (!cardFlip) {
      setTimeout(() => setVideo({ display: "none" }), 1200);
    } else {
      setVideo({ display: "block" });
    }
  }, [cardFlip]);

  const handleIframeError = (failedIndex) => {
    const nextIndex = failedIndex + 1;
    if (nextIndex < trailer.results.length) {
      setCurrentVideoIndex(nextIndex); // Try the next video
    } else {
      setCurrentVideoIndex(null); // No videos work
    }
  };

  return (
    <div className="flip-container">
      <div className="flip-content">
        <Card className={`card front ${cardFlip ? "flipCard" : ""}`}>
          <div id="flip-icon" onClick={() => setCardFlip(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-right arrow"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
              />
            </svg>
          </div>

          {/* <h1 className="" id="title">
            {movieData.title}
          </h1> */}

          <Card.Img
            className="cardImg"
            src={`https://image.tmdb.org/t/p/w342${movieData.poster_path}`}
            alt="Movie Poster"
          />
          <div className="year-genre-container">
            <h2 id="year">
              {movieData.origin_country &&
                movieData.origin_country
                  .map((country, index) => {
                    return (
                      country in countryToCountry && countryToCountry[country]
                    );
                  })
                  .join(" ")}
              ,{" "}
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
            <div className="runtime">
              <svg
                id="expandable-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                fill="currentColor"
                className="bi bi-clock-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
              </svg>
              <p>{movieData.runtime ? movieData.runtime : ""}</p>
            </div>
          </div>
          <p id="desc" className="text truncated-text">
            {movieData.overview}
          </p>
        </Card>
        <Card className={`card back`}>
          <div id="flip-icon" onClick={() => setCardFlip(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left arrow"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
              />
            </svg>
          </div>
          <h1 className="" id="title">
            {movieData.title}
          </h1>
          {/* {image.posters && image.posters.length > 0 && (
            <Card.Img
              className="cardImg"
              src={`https://image.tmdb.org/t/p/original${image.posters[1].file_path}`}
              alt="Poster"
            />
          )} */}
          {trailer.results && (
            <div className="ratio ratio-16x9" style={showVideo}>
              {trailer.results.map((video, index) => (
                <iframe
                  key={index}
                  src={`https://www.youtube.com/embed/${video.key}?controls=0&modestbranding=1&rel=0&showinfo=0`}
                  title={video.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onError={(e) => handleIframeError(index)}
                  style={{
                    display: index === currentVideoIndex ? "block" : "none",
                  }}
                ></iframe>
              ))}
            </div>
          )}

          <div className="language-container">
            <div className="language">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                fill="currentColor"
                id="expandable-svg-icon"
                className="bi bi-volume-up-fill"
                viewBox="0 0 16 16"
              >
                <path d="M11.536 14.01A8.47 8.47 0 0 0 14.026 8a8.47 8.47 0 0 0-2.49-6.01l-.708.707A7.48 7.48 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303z" />
                <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.48 5.48 0 0 1 11.025 8a5.48 5.48 0 0 1-1.61 3.89z" />
                <path d="M8.707 11.182A4.5 4.5 0 0 0 10.025 8a4.5 4.5 0 0 0-1.318-3.182L8 5.525A3.5 3.5 0 0 1 9.025 8 3.5 3.5 0 0 1 8 10.475zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06" />
              </svg>
              <p className="fixed-text">
                {movieData.original_language &&
                  movieData.original_language in langToLanguage &&
                  langToLanguage[movieData.original_language]}
              </p>
            </div>
            <h3 id="genres">
              Directed by:{" "}
              {credits.crew
                ? credits.crew.find((member) => member.job === "Director")?.name
                : ""}
            </h3>
          </div>
          <div className="cast-container">
            <h2 id="genres" className="text pt-3 pb-3">
              Starring:{" "}
              {credits.cast
                ? credits.cast
                    .slice(0, 3)
                    .map((actor) => actor.name)
                    .join(", ")
                : ""}
            </h2>
          </div>
          <div className="cast-container">
            {/* <Button type="button" class="btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-collection-play-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zm6.258-6.437a.5.5 0 0 1 .507.013l4 2.5a.5.5 0 0 1 0 .848l-4 2.5A.5.5 0 0 1 6 12V7a.5.5 0 0 1 .258-.437" />
              </svg>
            </Button>
            {provider.results.US
              ? provider.results.US.buy.slice(0, 3).map((provider, index) => (
                  <div key={index} className="provider">
                    <img
                      src={`${baseUrl}${provider.logo_path}`}
                      alt={provider.provider_name}
                      title={provider.provider_name}
                      style={{ width: "50px", height: "50px", margin: "10px" }}
                    />
                    <p>{provider.provider_name}</p>
                  </div>
                ))
              : ""} */}
          </div>
          <p id="desc" className="text truncated-text">
            <i>{movieData.tagline}</i>
          </p>
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
