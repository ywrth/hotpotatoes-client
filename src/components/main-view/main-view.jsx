import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { MovieCard } from "../movie-card/movie-card"; // Importing the MovieCard component
import { MovieView } from "../movie-view/movie-view"; // Importing the MovieView component
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://hotpotatoes.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            description: movie.description,
            image: movie.image,
            director: movie.director,
            genre: movie.genre,
          };
        });

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  // Handle user login
  if (!user) {
    return <LoginView onLoggedIn={(user) => setUser(user)} />;
  }

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
