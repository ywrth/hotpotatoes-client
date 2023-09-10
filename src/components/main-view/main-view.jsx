import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import NotFound from "../not-found/not-found"; // Import the 404 component

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
      <Container fluid>
        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Row>
                  <Col>
                    <SignupView
                      onSignup={(user, token, userObject) => {
                        handleLogin(user, token);
                        // Store userObject in localStorage if needed
                      }}
                    />
                  </Col>
                </Row>
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Row>
                  <Col>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        handleLogin(user, token);
                        // Store userObject in localStorage if needed
                      }}
                    />
                  </Col>
                </Row>
              )
            }
          />
          <Route
            path="/movies/:movieTitle"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Row>
                  <Col>No movies</Col>
                </Row>
              ) : (
                <Row>
                  <Col md={6}>
                    <MovieView
                      movies={movies}
                      user={user}
                      token={token}
                      setuser={(user) => setUser(user)}
                      selectedMovie={selectedMovie}
                    />
                  </Col>
                </Row>
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Row>
                  <Col>No movies</Col>
                </Row>
              ) : (
                <Row>
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
                </Row>
              )
            }
          />
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Row>
                  <Col>
                    <ProfileView
                      user={user}
                      movies={movies}
                      updateUsername={(user) => setUser(user)}
                    />
                  </Col>
                </Row>
              )
            }
          />
          {/* Fallback route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Change id to 'id'
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
    id: PropTypes.string.isRequired, // Change id to 'id'
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
