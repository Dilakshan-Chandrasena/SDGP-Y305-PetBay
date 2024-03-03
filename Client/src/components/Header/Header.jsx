import React from "react";
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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

export default function Header() {
  const { userId } = useAuth();
  console.log();
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
      {" "}
      <Navbar bg="dark" data-bs-theme="dark">
        {" "}
        <Container fluid>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            style={{ color: "whitesmoke", background: "whitesmoke" }}
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mx-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
            >
              <Navbar.Brand
                href="/home"
                className="mx-lg-4 mx-md-3 mx-2"
                style={{ fontWeight: "bolder", color: "whitesmoke" }}
              >
                <FontAwesomeIcon icon={faPaw} /> PetBay
              </Navbar.Brand>
              <Nav.Link
                href={`/pets/${userId}`}
                className={`mx-lg-3 mx-md-3 mx-2 ` + styles.link}
              >
                {" "}
                My Pets
              </Nav.Link>

              <Nav.Link
                href="#Preferences"
                className={`mx-lg-3 mx-md-3 mx-2 ` + styles.link}
              >
                {" "}
                Preferences
              </Nav.Link>
              <Nav.Link
                href="#Reminders"
                className={`mx-lg-3 mx-md-3 mx-2 ` + styles.link}
              >
                {" "}
                Reminders
              </Nav.Link>
              <Nav.Link
                href="#Community"
                className={`mx-lg-3 mx-md-3 mx-2 ` + styles.link}
              >
                {" "}
                Community
              </Nav.Link>
              <Nav.Link
                href="#LostFound"
                className={`mx-lg-3 mx-md-3 mx-2 ` + styles.link}
              >
                {" "}
                Lost & Found
              </Nav.Link>
              <Nav.Link
                href="#Prediction"
                className={`mx-lg-3 mx-md-3 mx-2 ` + styles.link}
              >
                {" "}
                Pet Prediction
              </Nav.Link>
              <Nav>
                <Nav.Link href="#user">
                  <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
                </Nav.Link>
              </Nav>
              <nav>
                <Nav.Link href="#user">
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className={styles.signOutButton}
                    onClick={logout}
                  />
                </Nav.Link>
              </nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
