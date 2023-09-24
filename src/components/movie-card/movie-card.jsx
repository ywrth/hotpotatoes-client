import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({
  movie,
  onMovieClick,
  showLogoutButton,
  handleLogout,
}) => {
  return (
    <Col xs={12} sm={12} md={12} lg={12}>
      <Link to={`/movies/${movie.Title}`} className="text-decoration-none">
        {" "}
        {/* Wrap Card with Link */}
        <div className="movie-card" onClick={() => onMovieClick(movie)}>
          <Card>
            <Card.Img variant="top" src={movie.ImageURL} />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>Director: {movie.Director.Name}</Card.Text>
              <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </Link>
      {showLogoutButton && (
        <div className="mt-2">
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
    </Col>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
  showLogoutButton: PropTypes.bool,
  handleLogout: PropTypes.func,
};

export default MovieCard;
