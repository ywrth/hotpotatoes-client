import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  Button,
  Row,
  Col,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "../movie-card/movie-card.scss";
import { MovieCard } from "../movie-card/movie-card.jsx";

export const ProfileView = ({ user, movies, token, updateUsername }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [show, setShow] = useState(false);
  const [deregister, setDeregister] = useState(false);
  const [error, setError] = useState(null); // New error state

  useEffect(() => {
    // Initialize state variables with user data when user prop changes
    if (user) {
      // Use 'user' object to set the initial values
      setUsername(user.username || "");
      setEmail(user.email || "");
      setBirthday(user.birthday || "");
    }
  }, [user]);

  const favourite_movies = movies.filter(
    (movie) => user.favourite_movies && user.favourite_movies.includes(movie.id)
  );

  // Initialize inputValue with a defined value
  const [inputValue, setInputValue] = useState("");

  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setError(null); // Clear any previous errors
  };
  const updateUser = () => {
    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };
    fetch("https://hotpotatoes.onrender.com/users/" + username, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.status === 401) {
          throw new Error(
            "Unauthorized: You are not authorized to perform this action."
          );
        }
        if (!response.ok) {
          throw new Error("Update failed");
        }
        return response.json();
      })
      .then((res) => {
        if (res.username) {
          localStorage.setItem("userObject", JSON.stringify(res));
          updateUsername(res);
          alert("Your account is updated");
          setShow(false);
        } else {
          setError("Update failed. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Update User Error:", error);
        setError("Update failed: " + error.message);
      });
  };
  const deleteUser = () => {
    fetch("https://hotpotatoes.onrender.com/users/" + username, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        alert("Your account is deleted successfully!");
        updateUsername(null);
        localStorage.clear();
        window.location.reload();
      });
  };
  const handleDeregister = () => setDeregister(true);
  const handleCloseDeregister = () => setDeregister(false);

  if (user) {
    // Use 'user' object to display user information
    return (
      <>
        <Row>
          <Col md={6} className="mx-auto">
            <Card border="primary" className="movieCard">
              <Card.Img
                className="card-image"
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png?20170328184010"
              />
              <Card.Body>
                <Card.Title className="text-center fs-4">
                  Profile
                  <br />
                </Card.Title>
                <Card.Text>
                  Username: {user.username}
                  <br />
                  Email: {user.email}
                  <br />
                  Birthday: {user.birthday}
                  <br />
                </Card.Text>

                <Button
                  variant="primary"
                  data-inline="true"
                  className="m-4 float-end"
                  onClick={handleShow}
                >
                  Update profile
                </Button>
                <Button
                  variant="primary"
                  data-inline="true"
                  className="m-4 float-end"
                  onClick={handleDeregister}
                >
                  Deregister your account
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <h2 className="text-center mb-5 mt-5">Favourite Movies</h2>
          </Col>
          {favourite_movies.map((movie) => (
            <Col
              className="mb-5 d-flex"
              key={movie.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <MovieCard
                movie={movie}
                user={user}
                token={token}
                setuser={(user) => updateUsername(user)}
              />
            </Col>
          ))}
        </Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="ms-auto">Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder={username}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your new password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateUser}>
              Update User
            </Button>
            {error && <p className="text-danger">{error}</p>}
          </Modal.Footer>
        </Modal>

        <Modal show={deregister} onHide={handleCloseDeregister}>
          <Modal.Header closeButton>
            <Modal.Title className="ms-auto">Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder={username}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your new password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateUser}>
              Update User
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={deregister} onHide={handleCloseDeregister}>
          <Modal.Header closeButton>
            <Modal.Title className="ms-auto">Deregister</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Do you want to delete your account?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDeregister}>
              Close
            </Button>
            <Button variant="primary" onClick={deleteUser}>
              Delete account
            </Button>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Type something..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button
                variant="outline-secondary"
                onClick={() => console.log(inputValue)}
              >
                Submit
              </Button>
            </InputGroup>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    // Return loading or error message while user data is being fetched
    return <div>Loading...</div>;
  }
};

ProfileView.propTypes = {
  user: PropTypes.object, // Ensure 'user' is of type object
  movies: PropTypes.array.isRequired, // Ensure 'movies' is an array
  token: PropTypes.string.isRequired, // Ensure 'token' is a string
  updateUsername: PropTypes.func.isRequired, // Ensure 'updateUsername' is a function
};
