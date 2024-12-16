import axios from "axios";
const usedMovies = [];
let isFirstMovieAdded = false;
let response;
export const getRecommendations = async (
  decline,
  movieId,
  currentMovie
) => {
  // Add the first movie to the array only once
  if (!isFirstMovieAdded && currentMovie) {
    usedMovies.push(currentMovie);
    isFirstMovieAdded = true; // Mark the first movie as added
    console.log("First movie added:", currentMovie);
  }
  try {
    if (decline) {
      response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?page=2`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGVmMjRjNzYzMWQ3NmJiYzM5OGZmODRmN2IzMWJkNSIsIm5iZiI6MTcyNDY4NzAxMy41NzYwOCwic3ViIjoiNjZjYzlmMDJiN2UyY2IzODNlZDg1YTk0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.s6tTljTKU-wHSzxgoZnmNRsLC2OONsnS40KuFbiWuQE",
          },
        }
      );
      console.log("declined:");
      console.log(response);
    } else {
      response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?page=1`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGVmMjRjNzYzMWQ3NmJiYzM5OGZmODRmN2IzMWJkNSIsIm5iZiI6MTcyNDY4NzAxMy41NzYwOCwic3ViIjoiNjZjYzlmMDJiN2UyY2IzODNlZDg1YTk0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.s6tTljTKU-wHSzxgoZnmNRsLC2OONsnS40KuFbiWuQE",
          },
        }
      );
      console.log("accept:");
      console.log(response);
    }
    if (response.data && response.data.results) {
      for (let i = 0; i < response.data.results.length; i++) {
        if (!usedMovies.includes(response.data.results[i].title)) {
          usedMovies.push(response.data.results[i].title);
          console.log(response.data.results[i].title);
          console.log(usedMovies);
          return response.data.results[i].title;
        }
      }
    } else {
      console.error("No recommendations found in the response.");
    }
  } catch (error) {
    console.error("Error fetching recommended movie:", error);
  }
};
