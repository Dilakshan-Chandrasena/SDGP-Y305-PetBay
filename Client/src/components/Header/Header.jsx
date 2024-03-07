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

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
      console.log("sign out");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.body}>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container fluid>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            style={{ color: "whitesmoke", background: "whitesmoke" }}
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mx-auto my-2 my-lg-0"
              style={{ maxHeight: "400px" }} // Adjusted maxHeight here
            >
              <Navbar.Brand
                href="/home"
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
              <Nav.Link href="#Reminders" className={`mx-2 ${styles.link}`}>
                Reminders
              </Nav.Link>
              <Nav.Link href="#Community" className={`mx-2 ${styles.link}`}>
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
              <Nav.Link href="#user">
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
