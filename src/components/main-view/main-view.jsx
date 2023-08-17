import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { MovieCard } from "../movie-card/movie-card"; // Importing the MovieCard component
import { MovieView } from "../movie-view/movie-view"; // Importing the MovieView component

export const MainView = () => {
  const [movies, setMovies] = useState([]); // Initialize movies state with an empty array
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    // Fetch movies from my API
    fetch("https://hotpotatoes.onrender.com/movies") //
      .then((response) => response.json())
      .then((data) => {
        setMovies(data); // Update the movies state with fetched data
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
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

// PropTypes for the updated components
MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })
  ),
  selectedMovie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }),
};

// Default props if needed
MainView.defaultProps = {
  movies: [],
  selectedMovie: null,
};
