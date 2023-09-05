import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({
  movie,
  onMovieClick,
  showLogoutButton,
  handleLogout,
}) => {
  const handleCardClick = () => {
    onMovieClick(movie);
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <Card className="h-100">
        <Card.Img variant="top" src={movie.ImageURL} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          {/* Access director's Name from the director object */}
          <Card.Text>Director: {movie.Director.Name}</Card.Text>
          <Link to={`/movies/${movie.Title}`}>
            <Button variant="link">Open</Button>
          </Link>

          {showLogoutButton && (
            <div className="mt-2">
              <Button variant="primary" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    // Adjust the PropTypes for the Director field
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired, // Assuming Name is a string
      // Add more PropTypes as needed for other director properties (e.g., Bio, Birth)
    }).isRequired,
    Genre: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
  showLogoutButton: PropTypes.bool,
  handleLogout: PropTypes.func, // Add prop type for handleLogout function
};

export default MovieCard;
