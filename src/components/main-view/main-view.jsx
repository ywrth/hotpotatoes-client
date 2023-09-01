import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch("https://hotpotatoes.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genres: movie.Genres,
            Genre: {
              Name: movie.Genre.Name,
            },
            Director: {
              Name: movie.Director.Name,
            },
            ImagePath: movie.ImagePath,
            Featured: movie.Featured,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user) => setUser(user)} />
        or
        <SignupView /> {/* Adding the SignupView here */}
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
      <button onClick={handleLogout}>Logout</button>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }),
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }),
    })
  ),
  selectedMovie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }),
};
