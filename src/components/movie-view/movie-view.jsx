export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} alt={movie.title} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre.Name}</span> {/* Render the genre's name */}
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.Name}</span> {/* Render the director's name */}
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
