export const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search movies by title..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};
