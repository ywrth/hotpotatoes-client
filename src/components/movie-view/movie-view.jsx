import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, setuser }) => {
  const storedToken = localStorage.getItem("token");
  const { movieTitle } = useParams();
  const movie = movies.find((movie) => movie.Title === movieTitle);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (
      movie &&
      user &&
      user.FavoriteMovies &&
      user.FavoriteMovies.includes(movie._id)
    ) {
      setIsFavourite(true);
    }
  }, [user, movie]);

  const addToFavourite = () => {
    fetch(
      `https://hotpotatoes.onrender.com/users/${user.Username}/movies/${movie._id}`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to add to favorites");
        }
      })
      .then((res) => {
        setIsFavourite(true);
        setuser(res);
        localStorage.setItem("userProfile", JSON.stringify(res));
        location.reload();
        // You can display a success message to the user here
      })
      .catch((error) => {
        // Handle errors here (e.g., display an error message)
        console.error("Error adding to favorites:", error);
      });
  };

  const removeFromFavourite = () => {
    fetch(
      `https://hotpotatoes.onrender.com/users/${user.Username}/movies/${movie._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to remove from favorites");
        }
      })
      .then((res) => {
        setIsFavourite(false);
        setuser(res);
        localStorage.setItem("userProfile", JSON.stringify(res));
        // You can display a success message to the user here
      })
      .catch((error) => {
        // Handle errors here (e.g., display an error message)
        console.error("Error removing from favorites:", error);
      });
  };

  return (
    <div className="container movie-view-container">
      <div className="row">
        <div className="d-flex justify-content-center align-items-center vh-70">
          <div className="col-lg-12 col-md-10 col-sm-12 mx-auto">
            <Card border="primary" className="movieCard mb-3">
              <Card.Img
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
                  Director: {movie.Director.Name}
                  <br />
                  Genre: {movie.Genre.Name}
                  <br />
                </Card.Text>
                <div className="d-flex justify-content-between">
                  {isFavourite ? (
                    <Button variant="danger" onClick={removeFromFavourite}>
                      Remove from favorites
                    </Button>
                  ) : (
                    <Button variant="success" onClick={addToFavourite}>
                      Add to favorites
                    </Button>
                  )}
                  <Link to={"/"}>
                    <Button variant="primary" type="link">
                      Back
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImageURL: PropTypes.string.isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }).isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default MovieView;
