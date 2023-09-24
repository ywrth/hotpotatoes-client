import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UpdateForm } from "./update-form";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.scss"; // Adjust the path if needed

export const ProfileView = ({
  user,
  movies,
  addToFavorites,
  removeFromFavorites,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [userFavoriteMovies, setUserFavoriteMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const handleMovieClick = (clickedMovie) => {
    setSelectedMovie(clickedMovie);
  };

  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem("userProfile"));
  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    setUsername(profile.Username);
    setPassword(profile.Password);
    setEmail(profile.Email);
    setBirthday(profile.Birthday);
    setUserFavoriteMovies(profile.FavoriteMovies);
  };

  // Define the onMovieClick function to navigate to the movie details page
  const onMovieClick = (movie) => {
    // Use the 'navigate' function from 'react-router-dom' to navigate
    navigate(`/movies/${movie._id}`); // You can adjust the route as needed
  };

  const favoriteMovies = movies.filter((movie) =>
    userFavoriteMovies.includes(movie._id)
  );
  const handleBack = () => {
    navigate("/");
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col xs={12} md={6} className="mb-3 userDetails">
          {" "}
          {/* Added className */}
          <Card className="no-hover">
            <Card.Body>
              <div>
                <h4>User Details</h4>
                <p>Username: {username}</p>
                <p>Birthday: {new Date(birthday).toDateString()}</p>
                <p>Email: {email}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} className="mb-3 updateForm">
          {" "}
          {/* Added className */}
          <Card className="no-hover">
            <Card.Body>
              <UpdateForm user={user} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col xs={12} className="favoriteMovies">
          {" "}
          {/* Added className */}
          <Card className="no-hover">
            <Card.Body>
              {favoriteMovies.length === 0 ? (
                <span>No favorite movies selected</span>
              ) : (
                <Row>
                  {favoriteMovies.map((movie) => (
                    <Col key={movie._id} xs={12} md={6} lg={4} className="mb-3">
                      {" "}
                      <MovieCard
                        movie={movie}
                        onMovieClick={handleMovieClick}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
