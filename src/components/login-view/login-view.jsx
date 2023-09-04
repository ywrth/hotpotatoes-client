import React, { useState, useEffect } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true); // Show loading indicator

    const input = {
      Username: username,
      Password: password,
    };

    fetch("https://hotpotatoes.onrender.com/login", {
      method: "POST",
      body: JSON.stringify(input),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false); // Hide loading indicator
        if (data.user) {
          onLoggedIn(data.user.Username);
          localStorage.setItem("token", data.token);
          setUsername(""); // Clear username field
          setPassword(""); // Clear password field
        } else {
          setError("Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        setIsLoading(false); // Hide loading indicator
        setError("An error occurred. Please try again later.");
        console.error("Login error:", error);
      });
  };

  useEffect(() => {
    // Fetch movie data after the user has logged in
    const token = localStorage.getItem("token");
    if (token) {
      fetch("https://hotpotatoes.onrender.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data from API:", data);
          // Process and set the movie data as needed
        })
        .catch((error) => {
          console.error("Error fetching data from API:", error);
        });
    }
  }, [onLoggedIn]);

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <label>
        Username:
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </label>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Submit"}
      </button>
    </form>
  );
};
