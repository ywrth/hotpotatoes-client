import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

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
        console.log("data:", data);
        if (data.user) {
          console.log("username:", data.user.username);
          onLoggedIn(data.user.Username);
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
      <button type="submit">Submit</button>
    </form>
  );
};
