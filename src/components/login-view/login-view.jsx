import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      access: username,
      secret: password,
    };

    try {
      const response = await fetch(
        "https://openlibrary.org/account/login.json",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        onLoggedIn(username);
      } else {
        setError("Login failed");
      }
    } catch (error) {
      setError("An error occurred while logging in");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
      {error && <p>{error}</p>}
    </form>
  );
};
