import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import Movie from "./Movie.jsx";
import MovieCard from "./MovieCard.jsx";
import ShoppingCart from "./ShoppingCart.jsx";
import Select from "./Select.jsx";

import "./App.css";
import "./index.css";

let selectedMovies = [];
let movieId;
let response;

function App() {
  const [movieData, setMovieData] = useState({});
  const [credits, setCredits] = useState({});
  // State to store the current movie
  const [currentMovie, setCurrentMovie] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [fadeOut, setFadeOut] = useState(false); // Fade-out state
  const [showForm, setShowForm] = useState(true); // State to show form
  const [showSelect, setShowSelect] = useState(false);

  function fetchRecommendations(decline) {
    return new Promise((resolve) => {
      setTimeout(async () => {
        setLoading(true); // Set loading to true
        setShowSelect(false);
        //console.log("Running.");
        // Simulate loading with setTimeout
        setTimeout(async () => {
          try {
            response = await axios.get("http://127.0.0.1:5000/r", {
              params: { movie: currentMovie },
            });
            if (decline) {
              response = await axios.get("http://127.0.0.1:5000/r", {
                params: { movie: currentMovie, type: "GETDECLINED" },
              });
            }

            // Update the state with the fetched recommendation
            console.log(response);
            setCurrentMovie(response.data);
            setShowForm(false); // Hide form after successful fetch
          } catch (error) {
            console.error("Error fetching movie recommendation:", error);
          }
          resolve();
        }, 1000); // 500 ms delay for loading
      }, 500); // Wait for fade-out animation to finish (500ms)
    });
  }

  const fetchMovieData = async (decline = false) => {
    setFadeOut(true); // Start fade-out
    if (!decline && currentMovie && !showForm) {
      const currentMovieClass = new Movie(
        currentMovie,
        movieId,
        movieData,
        credits
      );
      console.log("worked!");
      console.log(currentMovieClass);
      selectedMovies.push(currentMovieClass);
      console.log(selectedMovies);
    }

    //console.log(currentMovie);
    await fetchRecommendations(decline);
    console.log(response.data);

    try {
      const searchTerm = response.data; // Replace with your dynamic term
      const searchResponse = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGVmMjRjNzYzMWQ3NmJiYzM5OGZmODRmN2IzMWJkNSIsIm5iZiI6MTcyNDY4NzAxMy41NzYwOCwic3ViIjoiNjZjYzlmMDJiN2UyY2IzODNlZDg1YTk0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.s6tTljTKU-wHSzxgoZnmNRsLC2OONsnS40KuFbiWuQE",
          },
        }
      );
      movieId = searchResponse.data.results[0].id;
      console.log(movieId);
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGVmMjRjNzYzMWQ3NmJiYzM5OGZmODRmN2IzMWJkNSIsIm5iZiI6MTcyNDY4NzAxMy41NzYwOCwic3ViIjoiNjZjYzlmMDJiN2UyY2IzODNlZDg1YTk0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.s6tTljTKU-wHSzxgoZnmNRsLC2OONsnS40KuFbiWuQE",
          },
        }
      );
      // console.log(movieResponse);

      const creditsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGVmMjRjNzYzMWQ3NmJiYzM5OGZmODRmN2IzMWJkNSIsIm5iZiI6MTcyNDY4NzAxMy41NzYwOCwic3ViIjoiNjZjYzlmMDJiN2UyY2IzODNlZDg1YTk0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.s6tTljTKU-wHSzxgoZnmNRsLC2OONsnS40KuFbiWuQE",
          },
        }
      );

      setMovieData(movieResponse.data);
      setCredits(creditsResponse.data);
      console.log(creditsResponse.data);
      // console.log(credits);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    } finally {
      setLoading(false); // Set loading to false
      setFadeOut(false); // Reset fade-out state for next fetch
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    fetchMovieData(false); // Call function to fetch movie data
    await axios.delete("http://127.0.0.1:5000/r");
  };

  const handleInputChange = (event) => {
    setCurrentMovie(event.target.value); // Update movie title state
  };

  return (
    <div className="app fixed-height-card">
      {loading ? ( // Conditional rendering for loading state
        <div className="loading-screen fade-in-up">
          <Spinner animation="border" role="status">
            <span className="visually-hidden fade-in-up">Loading...</span>
          </Spinner>
          <p>Loading...</p>
        </div>
      ) : showForm ? ( // Render the form if showForm is true
        <Form onSubmit={handleSubmit} className="mb-2">
          <Form.Group controlId="formMovieTitle">
            <Form.Label>Enter Movie Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type movie title here"
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mb-2 search">
            Search
          </Button>
        </Form>
      ) : showSelect ? (
        <>
          <Select movies={selectedMovies} />
          <ShoppingCart showSelect={showSelect} setShowSelect={setShowSelect} movies={selectedMovies}/>
        </>
      ) : (
        movieData && ( // Render the card if movieData is available
          <>
            <div className="buttons">
              <svg
                id="expandable-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-x-circle-fill leftButton `}
                viewBox="0 0 16 16"
                onClick={() => {
                  fetchMovieData(true);
                }}
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
              </svg>
              <MovieCard
                fadeOut={fadeOut}
                movieData={movieData}
                credits={credits}
              />
              <svg
                id="expandable-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-check-circle-fill rightButton `}
                viewBox="0 0 16 16"
                onClick={() => {
                  fetchMovieData(false);
                }}
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            </div>
            <ShoppingCart showSelect={showSelect} setShowSelect={setShowSelect} movies={selectedMovies} fadeOut={fadeOut}/>
          </>
        )
      )}
    </div>
  );
}

export default App;
