import React, { useEffect, useState } from "react";
import "./MovieProgressbar.css";

function MovieProgressBar() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Handle the scroll event to update the scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollLeft = window.scrollX; // current horizontal scroll position
      const docWidth = document.documentElement.scrollWidth - window.innerWidth; // total scrollable width
      const scrollPercent = (scrollLeft / docWidth) * 100; // Calculate horizontal scroll percentage

      setScrollPercentage(scrollPercent); // Update the scroll percentage state
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate the translateX value based on the scroll percentage
  const transformValue = `translateX(${scrollPercentage}%)`;

  // Calculate the background color transition
//   const backgroundColor = `rgb(${255 - scrollPercentage * 2}, ${
//     255 - scrollPercentage * 2
//   }, ${255})`;

  return (
    <div id="movie_progressbar">
      <div
        className="progress"
        style={{
          transform: transformValue, // Adjust position based on scroll
        //   backgroundColor: backgroundColor, // Gradually turn white
        }}
      ></div>
    </div>
  );
}

export default MovieProgressBar;
