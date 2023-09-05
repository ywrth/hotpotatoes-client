import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button"; // Import Button from react-bootstrap
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    console.log("my token", token);
    if (!token) return;

    fetch("https://hotpotatoes.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data from API:", data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Genre: movie.Genre.Name,
            Director: movie.Director.Name,
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

  return (
    <Container>
      <div>
        {!user ? (
          <Row className="justify-content-md-center">
            <Col md={5}>
              <LoginView onLoggedIn={(user) => setUser(user)} />
            </Col>
            <Col md={5}>
              <h2>REGISTER</h2>
              <SignupView />
            </Col>
          </Row>
        ) : (
          <div>
            <Button
              variant="primary"
              onClick={handleLogout}
              className="mb-2" // Add margin-bottom spacing
            >
              Logout
            </Button>
            {selectedMovie ? (
              <Col md={8}>
                <MovieView
                  movie={selectedMovie}
                  onBackClick={() => setSelectedMovie(null)}
                />
              </Col>
            ) : movies.length === 0 ? (
              <div>The list is empty!</div>
            ) : (
              <Row>
                {movies.map((movie) => (
                  <Col className="mb-5" key={movie._id} md={3}>
                    <MovieCard
                      movie={movie}
                      onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                      }}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </div>
        )}
      </div>
    </Container>
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
