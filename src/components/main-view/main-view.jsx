import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card"; // Importing the MovieCard component
import { MovieView } from "../movie-view/movie-view"; // Importing the MovieView component

export const MainView = () => {
  const [movies, setMovies] = useState([
    // An array of movie objects, each containing details like id, title, description, etc.

    {
      id: 1,
      title: "Banshees of Inisherin",
      description:
        "British-Irish playwright and filmmaker. He is known for his absurdist black humour which often challenges the modern theatre aesthetic.",
      image:
        "https://i0.wp.com/filmpluskritik.com/wp-content/uploads/2023/01/the-banshees-of-inisherin-007_BOI_16149_C_rgb.jpg?resize=1536%2C964&ssl=1",
      director: "Martin McDonagh",
      genre: "Drama",
    },
    {
      id: 2,
      title: "Nomadland",
      description:
        "A woman in her sixties, after losing everything in the Great Recession, embarks on a journey through the American West, living as a van-dwelling modern-day nomad.",
      image:
        "https://variety.com/wp-content/uploads/2020/08/nomadland-francis-mcdormand.jpg?w=1000&h=563&crop=1",
      director: "Chloé Zhao",
      genre: "Drama",
    },
    {
      id: 3,
      title: "The Hours",
      description:
        "The story of three women searching for more potent, meaningful lives. Each is alive at a different time and place, all are linked by their yearnings and their fears.",
      image:
        "https://decider.com/wp-content/uploads/2017/12/the-hours-lead-2.jpg?quality=75&strip=all&w=1284&h=856&crop=1",
      director: "Stephen Daldry",
      genre: "Drama",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null); // State to track the currently selected movie

  // If a movie is selected, display its details using the MovieView component
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      /> //
    );
  }
  // If there are no movies, show a message indicating the list is empty
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  // If there are movies, render them using MovieCard components
  return (
    <div>
      <button
        onClick={() => {
          alert("Nice!");
        }}
      >
        Click me!
      </button>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
