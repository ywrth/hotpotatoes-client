import React from "react";
import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.ImageURL} alt={movie.Title} />
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
        <span>{movie.Genre.Name}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired, // Corrected 'description' to 'Description'
    ImageURL: PropTypes.string.isRequired, // Corrected 'image' to 'ImageURL'
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    }).isRequired,
    Genre: PropTypes.shape({
      // Corrected 'genre' to 'Genre'
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
