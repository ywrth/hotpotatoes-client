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
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string, // Optional
      Birth: PropTypes.string,
    }).isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string, // Optional
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
