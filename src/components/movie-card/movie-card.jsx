import React from "react";
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div onClick={() => onMovieClick(movie)}>
      <div>{movie.Title}</div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    Title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired, // Corrected 'description' to 'Description'
    image: PropTypes.string.isRequired,
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      // Other director properties if applicable
    }).isRequired,
    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      // Other genre properties if applicable
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
