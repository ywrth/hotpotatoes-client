import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  const handleCardClick = () => {
    onMovieClick(movie);
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <Card className="h-100">
        <Card.Img variant="top" src={movie.ImageURL} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Director}</Card.Text>
          <Button variant="link">Open</Button>
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
    Director: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};

export default MovieCard;
