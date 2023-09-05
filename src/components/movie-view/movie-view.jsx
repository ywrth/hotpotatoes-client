import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const MovieView = ({ movies, user, token, setuser, onBackClick }) => {
  const { movieTitle } = useParams();
  const movie = movies.find((movie) => movie.Title === movieTitle);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (user.favourite_movies && user.favourite_movies.includes(movie._id)) {
      setIsFavourite(true);
    }
  }, []);

  const addToFavourite = () => {
    fetch(
      `https://hotpotatoes.onrender.com/users/${user.username}/${movie._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((res) => {
        setIsFavourite(true);
        setuser(res);
        localStorage.setItem("userObject", JSON.stringify(res));
        alert("Movie is added to favouriteList");
      });
  };

  const removeFromFavourite = () => {
    fetch(
      `https://hotpotatoes.onrender.com/users/${user.username}/${movie._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((res) => {
        setIsFavourite(false);
        setuser(res);
        localStorage.setItem("userObject", JSON.stringify(res));
        alert("Movie is removed from favouriteList");
      });
  };

  return (
    <div className="movie-view-container">
      <Card border="primary" className="movieCard">
        <Card.Img
          height="30%"
          className="object-fit-cover flex-fill"
          src={movie.ImageURL}
        />
        <Card.Body>
          <Card.Title>
            Title: {movie.Title}
            <br />
          </Card.Title>
          <Card.Text>
            Description: {movie.Description}
            <br />
            Director: {movie.Director}
            <br />
            Genre: {movie.Genre}
            <br />
          </Card.Text>
          <Link to={"/"}>
            <Button variant="primary" type="link">
              Back
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );

  /* Alternative Layout:
  return (
    <div className="movie-view-container">
      <Container className="movie-view-content">
        <div className="title-section">
          <h1 className="custom-title">{movie.Title}</h1>
        </div>
        <img src={movie.ImageURL} alt={movie.Title} className="img-fluid" />
        <div>
          <span style={{ fontWeight: "bold" }}>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>Genre: </span>
          <span>{movie.Genre}</span>
        </div>
        <div>
          <span style={{ fontWeight: "bold" }}>Director: </span>
          <span>{movie.Director}</span>
        </div>
        <Link to={`/`}>
          <button onClick={onBackClick} className="back-button">
            <span style={{ marginTop: "10px" }}>Back</span>
          </button>
        </Link>
      </Container>
    </div>
  );
  */
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImageURL: PropTypes.string.isRequired,
      Director: PropTypes.string.isRequired,
      Genre: PropTypes.string.isRequired,
    })
  ).isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  setuser: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
