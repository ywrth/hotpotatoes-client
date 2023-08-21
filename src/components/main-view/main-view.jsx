import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { MovieCard } from "../movie-card/movie-card"; // Importing the MovieCard component
import { MovieView } from "../movie-view/movie-view"; // Importing the MovieView component
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

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
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            ImageURL: movie.ImageURL,
            Director: movie.Director,
            Genre: movie.Genre,
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

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <>
        <button onClick={handleLogout}>Logout</button>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie} // Prop name should be "movie"
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
      _id: PropTypes.number.isRequired,
      Title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })
  ),
  selectedMovie: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    Title: PropTypes.string.isRequired,
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
