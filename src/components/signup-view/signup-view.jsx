import React, { useState } from "react";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Client-side validation
    if (!validateInputs()) {
      return;
    }

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch("https://hotpotatoes.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Signup successful");
          window.location.reload();
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          console.error("Signup failed:", data);
          alert("Signup failed once again");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  const validateInputs = () => {
    // Perform additional client-side validation here
    if (username.length < 3) {
      alert("Username must be at least 3 characters long.");
      return false;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
    }

    // You can add more validation rules here (e.g., email format)

    return true;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label htmlFor="birthday">Birthday:</label>
      <input
        type="date"
        id="birthday"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupView;
