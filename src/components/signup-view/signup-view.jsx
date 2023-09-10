import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Clear previous messages
    setError("");
    setSuccessMessage("");

    // Client-side validation
    if (!validateInputs()) {
      return;
    }

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
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
          setSuccessMessage("Signup successful! You can now log in.");
          clearForm();
        } else {
          setError("Signup failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        setError("An error occurred. Please try again later.");
      });
  };

  const validateInputs = () => {
    if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      return false;
    }

    // Basic email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Invalid email address.");
      return false;
    }

    return true;
  };

  const clearForm = () => {
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
    setEmail("");
    setBirthday("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="error-success-messages">
        {error && <Alert variant="danger">{error}</Alert>}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
      </div>

      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />
      </Form.Group>

      <Form.Group controlId="formConfirm">
        <Form.Label>Confirm Password:</Form.Label>
        <Form.Control
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
          autoComplete="new-password"
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <div className="text-center mt-3">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};
