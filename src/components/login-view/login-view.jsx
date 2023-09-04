import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container"; // Import Container from react-bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch movie data using the token
      fetch("https://hotpotatoes.onrender.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Data from API:", data);
          // Check if the data is empty or undefined
          if (!data || data.length === 0) {
            console.warn("Movie data is empty.");
          } else {
            // Process and set the movie data as needed
          }
        })
        .catch((error) => {
          console.error("Error fetching data from API:", error);
        });
    }
  }, [onLoggedIn]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
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
              />
            </Form.Group>
            <div className="text-center mt-3">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
