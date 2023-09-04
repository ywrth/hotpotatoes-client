import "./movie-view.scss";
import React from "react";
import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  const handleHardClick = () => {
    onBackClick();
  };

  return (
    <div onClick={handleHardClick} className="movie-card">
      <div className="container">
        <img src={movie.ImageURL} alt={movie.Title} className="img-fluid" />
      </div>
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
