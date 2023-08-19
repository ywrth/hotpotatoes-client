import React from "react";
import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return <div onClick={() => onMovieClick(movie)}>{movie.Title}</div>;
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      // Other director properties if applicable
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      // Other genre properties if applicable
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
