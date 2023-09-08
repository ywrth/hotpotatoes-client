import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";

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
    <Row className="justify-content-center">
      <Col xs={12} sm={8} md={6} lg={4}>
        <div className="login">
          <Form className="form" onSubmit={handleSubmit}>
            <Form.Text className="text-center mb-3 fs-3 logout-button text-black">
              Login Page
            </Form.Text>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your username with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Form.Text className="text-muted text-center">
              Don't have an account?
            </Form.Text>
            <Button
              variant="link"
              className="text-center logout-button"
              onClick={() => {
                /* Handle navigation to signup view */
              }}
            >
              Register
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
