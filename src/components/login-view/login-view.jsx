import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsLoading(true); // Show loading indicatord
    setError(null); // Clear any previous errors

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
          onLoggedIn(data.user);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userProfile", JSON.stringify(data.user));
          setUsername(""); // Clear username field
          setPassword(""); // Clear password field
        } else {
          setError("Invalid credentials. Please try again.");
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

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/signup"); // replace with your signup route
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={10}>
          <Form className="form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="white-label">Username</Form.Label>
              <Form.Control
                style={{ backgroundColor: "white", borderColor: "#ccc" }}
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
              <Form.Label className="white-label">Password</Form.Label>
              <Form.Control
                style={{ backgroundColor: "white", borderColor: "#ccc" }}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            {error && (
              <Alert variant="danger" className="mt-3">
                {error}
              </Alert>
            )}
            <Form.Text className="text-muted text-center mt-2 custom-text-color">
              Don't have an account?{" "}
              <Button
                variant="link"
                onClick={handleRegisterClick}
                className="custom-text-color"
              >
                Register
              </Button>
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
