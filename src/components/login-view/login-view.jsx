import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      access: username,
      secret: password,
    };

    fetch("https://hotpotatoes.onrender.com/login", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        onLoggedIn(username);
      } else {
        alert("Login failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username" // Add this attribute
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          id="password" // Add an id attribute
          name="password" // Add a name attribute
          value={password}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username" // Add this attribute
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
