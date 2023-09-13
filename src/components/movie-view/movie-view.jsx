import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const MovieView = ({ movies, user, token, setuser }) => {
  const { movieTitle } = useParams();
  const movie = movies.find((movie) => movie.Title === movieTitle);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (
      user &&
      user.favourite_movies &&
      user.favourite_movies.includes(movie._id)
    ) {
      setIsFavourite(true);
    }
  }, [user, movie._id]);

  const addToFavourite = async () => {
    console.log("this is the user", user);
    console.log("movie id", movie._id);
    const response = await fetch(
      `https://hotpotatoes.onrender.com/users/${user}/movies/${movie._id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.stringify(token)}`,
        },
      }
    );
    console.log("this is the response", response);
    // fetch(
    //   `https://hotpotatoes.onrender.com/users/${user}/movies/${movie._id}`,

    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // )
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error("Failed to add to favorites");
    //     }
    //   })
    //   .then((res) => {
    //     setIsFavourite(true);
    //     setuser(res);
    //     localStorage.setItem("userObject", JSON.stringify(res));
    //     // You can display a success message to the user here
    //   })
    //   .catch((error) => {
    //     // Handle errors here (e.g., display an error message)
    //     console.error("Error adding to favorites:", error);
    //   });
  };

  const removeFromFavourite = () => {
    fetch(
      `https://hotpotatoes.onrender.com/users/${username}/movies/${movie._id}`,
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
        } else {
          throw new Error("Failed to remove from favorites");
        }
      })
      .then((res) => {
        setIsFavourite(false);
        setuser(res);
        localStorage.setItem("userObject", JSON.stringify(res));
        // You can display a success message to the user here
      })
      .catch((error) => {
        // Handle errors here (e.g., display an error message)
        console.error("Error removing from favorites:", error);
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
            Director: {movie.Director.Name} {/* Access Name property */}
            <br />
            Genre: {movie.Genre.Name} {/* Access Name property */}
            <br />
          </Card.Text>
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
        </Card.Body>
      </Card>
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
      }).isRequired, // Director is an object with Name property
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }).isRequired, // Genre is an object with Name property
    })
  ).isRequired,
};
export default MovieView;
