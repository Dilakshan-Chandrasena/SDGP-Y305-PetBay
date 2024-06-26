import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPaw,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export default function Header() {
  const { userId } = useAuth();
  const navigate = useNavigate();

  // Function to handle user logout
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Navigate to login page after logout
      console.log("sign out");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.body}>
      {/* Bootstrap Navbar */}
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container fluid>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            className={styles.hamburger}
          />
          <Navbar.Collapse id="navbarScroll">
            {/* Navigation Links */}
            <Nav
              className="mx-auto my-2 my-lg-0"
              style={{ maxHeight: "400px" }} // Adjusted maxHeight here
            >
              <Navbar.Brand
                as={Link}
                to={"/home"}
                className={`mx-2 ${styles.link}`}
                style={{ fontWeight: "bolder", color: "whitesmoke" }}
              >
                <FontAwesomeIcon icon={faPaw} /> PetBay
              </Navbar.Brand>
              <Nav.Link
                as={Link}
                to={`/pets/${userId}`}
                className={`mx-2 ${styles.link}`}
              >
                My Pets
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={"/Quiz"}
                className={`mx-2 ${styles.link}`}
              >
                Preferences
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={`/reminder/${userId}`}
                className={`mx-2 ${styles.link}`}
              >
                Reminders
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={`/community/feed/${userId}`}
                className={`mx-2 ${styles.link}`}
              >
                Community
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={"/lostfound"}
                className={`mx-2 ${styles.link}`}
              >
                Lost & Found
              </Nav.Link>
              <Nav.Link
                as={Link}
                to={"/pet-recommendation"}
                className={`mx-2 ${styles.link}`}
              >
                Pet Recommendation
              </Nav.Link>
              {/* User Profile and Logout */}
              <Nav.Link as={Link} to={"/user"}>
                <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
              </Nav.Link>
              <Nav.Link href="#signout">
                <FontAwesomeIcon
                  icon={faArrowRightFromBracket}
                  className={styles.signOutButton}
                  onClick={logout}
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
