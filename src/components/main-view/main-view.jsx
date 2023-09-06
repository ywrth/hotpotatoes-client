// MainView.js
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch("https://hotpotatoes.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: movie.Genre,
            Director: movie.Director,
            ImageURL: movie.ImageURL,
            Featured: movie.Featured,
          };
        });

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const handleLogin = (loggedInUser, authToken) => {
    setUser(loggedInUser);
    setToken(authToken);
    // Store user object and token in localStorage if needed
  };

  const handleMovieClick = (clickedMovie) => {
    setSelectedMovie(clickedMovie);
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLogout={handleLogout} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col>
                  <SignupView
                    onSignup={(user, token, userObject) => {
                      handleLogin(user, token);
                      // Store userObject in localStorage if needed
                    }}
                  />
                </Col>
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      handleLogin(user, token);
                      // Store userObject in localStorage if needed
                    }}
                  />
                </Col>
              )
            }
          />
          <Route
            path="/movies/:movieTitle"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>No movies</Col>
              ) : (
                <Col md={6} className="application">
                  <MovieView
                    movies={movies}
                    user={user}
                    token={token}
                    setuser={(user) => setUser(user)}
                    selectedMovie={selectedMovie} // Pass selectedMovie
                  />
                </Col>
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>No movies</Col>
              ) : (
                <>
                  {movies.map((movie) => (
                    <Col
                      className="mb-5 d-flex"
                      key={movie._id}
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                    >
                      <MovieCard
                        movie={movie}
                        onMovieClick={handleMovieClick}
                        user={user}
                        token={token}
                        setuser={(user) => setUser(user)}
                      />
                    </Col>
                  ))}
                </>
              )
            }
          />
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col>
                  <ProfileView
                    user={user}
                    movies={movies}
                    token={token}
                    updateUsername={(user) => setUser(user)}
                  />
                </Col>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImageURL: PropTypes.string.isRequired,
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
    ImageURL: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }),
};

export default MainView;
