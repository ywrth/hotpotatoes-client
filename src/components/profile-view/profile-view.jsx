import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UpdateForm } from "./update-form";
import { MovieCard } from "../movie-card/movie-card";

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

  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const token = localStorage.getItem("token");
    fetch(`https://hotpotatoes.onrender.com/users/${user.Username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setUsername(response.Username);
        setPassword(response.Password);
        setEmail(response.Email);
        setBirthday(response.Birthday);
        setUserFavoriteMovies(response.FavoriteMovies);
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  };

  console.log("movies", movies);
  const favoriteMovies = movies.filter((movie) =>
    userFavoriteMovies.includes(movie.id)
  );
  console.log("favoriteMovies", favoriteMovies);
  const handleBack = () => {
    navigate("/");
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Button onClick={handleBack}>Back</Button>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <div>
                <h4>User Details</h4>
                <p>Username: {username}</p>
                <p>Birthday: {birthday}</p>
                <p>Email: {email}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <UpdateForm user={user} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              {favoriteMovies.length === 0 ? (
                <span>No favorite movies selected</span>
              ) : (
                <Row>
                  {favoriteMovies.map((movie) => (
                    <Col key={movie.id} xs={12} md={4} lg={4} className="mb-4">
                      <MovieCard movie={movie} />
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
