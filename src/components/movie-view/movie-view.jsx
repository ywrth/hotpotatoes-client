import "./movie-view.scss";
import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "react-bootstrap"; // Import Bootstrap components

export const MovieView = ({ movie, onBackClick }) => {
  const handleHardClick = () => {
    onBackClick();
  };

  return (
    <Container fluid>
      {" "}
      {/* Use fluid container to expand to full width */}
      <Row className="justify-content-center align-items-center min-vh-100">
        {" "}
        {/* Vertically and horizontally center content */}
        <Col sm={10}>
          {" "}
          {/* Specify the column width (adjust as needed) */}
          <div className="movie-card">
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
            <Button onClick={handleHardClick} className="back-button">
              Back
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
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
