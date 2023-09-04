import "./movie-view.scss";
import React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container"; // Import Container from react-bootstrap

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className="movie-view-container">
      <Container className="movie-view-content">
        <img src={movie.ImageURL} alt={movie.Title} className="img-fluid" />
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span>Genre: </span>
          <span>{movie.Genre}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director}</span>
        </div>
        <button onClick={onBackClick} className="back-button">
          Back
        </button>
      </Container>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
