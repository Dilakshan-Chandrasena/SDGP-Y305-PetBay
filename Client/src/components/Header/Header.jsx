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

export default function Header() {
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
      <Navbar expand="lg" className=" ">
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
              navbarScroll
            >
              <Navbar.Brand
                href="#"
                className="mx-lg-4 mx-md-3 mx-2"
                style={{ fontWeight: "bolder", color: "whitesmoke" }}
              >
                <FontAwesomeIcon icon={faPaw} /> PetBay
              </Navbar.Brand>
              <Nav.Link
                href="#action1"
                className={`mx-lg-3 mx-md-3 mx-2 ` + styles.link}
              >
                {" "}
                Home
              </Nav.Link>

              <Nav.Link
                href="#action2"
                className={`mx-lg-3 mx-md-3 mx-2 ` + styles.link}
              >
                {" "}
                Preferences
              </Nav.Link>
              <Nav.Link
                href="#action2"
                className={`mx-lg-3 mx-md-3 mx-2 ` + styles.link}
              >
                {" "}
                Reminders
              </Nav.Link>
              <Nav.Link
                href="#action2"
                className={`mx-lg-3 mx-md-3 mx-2 ` + styles.link}
              >
                {" "}
                Community
              </Nav.Link>
              <Nav.Link
                href="#action2"
                className={`mx-lg-3 mx-md-3 mx-2 ` + styles.link}
              >
                {" "}
                Lost & Found
              </Nav.Link>
              <Nav.Link
                href="#action2"
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
