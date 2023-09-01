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
    Description: PropTypes.string.isRequired, // Updated 'description' to 'Description'
    ImageURL: PropTypes.string.isRequired, // Updated 'image' to 'ImageURL'
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

export default MovieCard;
