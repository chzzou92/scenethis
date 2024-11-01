const acceptButton = document.querySelector("#acceptbtn");
const title = document.querySelector("#title");
const posterImage = document.querySelector("#posterImg");
const year = document.querySelector("#year");
const description = document.querySelector("#desc");
const director = document.querySelector("#director");
const cast = document.querySelector("#cast");

let currentMovie = "Project X";

acceptButton.addEventListener("click", async function () {
  const data = await axios.get("http://127.0.0.1:5000/r", {
    params: { movie: currentMovie },
  });
  currentMovie = data.data.data;
  const searchTerm = data.data.data;
  const movieImageData = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`,
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGVmMjRjNzYzMWQ3NmJiYzM5OGZmODRmN2IzMWJkNSIsIm5iZiI6MTcyNDY4NzAxMy41NzYwOCwic3ViIjoiNjZjYzlmMDJiN2UyY2IzODNlZDg1YTk0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.s6tTljTKU-wHSzxgoZnmNRsLC2OONsnS40KuFbiWuQE",
      },
    }
  );
  title.textContent = data.data.data;
  const movieData = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieImageData.data.results[0].id}`,
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGVmMjRjNzYzMWQ3NmJiYzM5OGZmODRmN2IzMWJkNSIsIm5iZiI6MTcyNDY4NzAxMy41NzYwOCwic3ViIjoiNjZjYzlmMDJiN2UyY2IzODNlZDg1YTk0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.s6tTljTKU-wHSzxgoZnmNRsLC2OONsnS40KuFbiWuQE",
      },
    }
  );
  const movieCredits = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieImageData.data.results[0].id}/credits`,
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGVmMjRjNzYzMWQ3NmJiYzM5OGZmODRmN2IzMWJkNSIsIm5iZiI6MTcyNDY4NzAxMy41NzYwOCwic3ViIjoiNjZjYzlmMDJiN2UyY2IzODNlZDg1YTk0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.s6tTljTKU-wHSzxgoZnmNRsLC2OONsnS40KuFbiWuQE",
      },
    }
  );
  console.log(movieCredits);
  //director.textContent = "Directed by: " + movieCredits.data.crew[0].name;
  for (let member of movieCredits.data.crew) {
    if (member.known_for_department === "Directing") {
      director.textContent = "Directed by: " + member.name;
    }
  }
  cast.textContent =
    "Starring: " +
    movieCredits.data.cast[0].name +
    ", " +
    movieCredits.data.cast[1].name;

  console.log(movieData);
  year.textContent = movieImageData.data.results[0].release_date.slice(0, 4);
  description.textContent = movieImageData.data.results[0].overview;
  posterImage.src = `http://image.tmdb.org/t/p/w342/${movieImageData.data.results[0].poster_path}`;
});
