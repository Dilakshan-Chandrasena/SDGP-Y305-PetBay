import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import styles from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPaw } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className={styles.body}>
      {" "}
      <Navbar expand="lg" className="bg-body-tertiary py-lg-4 py-md-3 py-2">
        {" "}
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mx-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Navbar.Brand
                href="#"
                className="mx-lg-4 mx-md-3 mx-2"
                style={{ fontWeight: "bolder" }}
              >
                <FontAwesomeIcon icon={faPaw} /> PetBay
              </Navbar.Brand>
              <Nav.Link href="#action1" className="mx-lg-4 mx-md-3 mx-2">
                {" "}
                Home
              </Nav.Link>

              <Nav.Link href="#action2" className="mx-lg-4 mx-md-3 mx-2">
                {" "}
                Preferences
              </Nav.Link>
              <Nav.Link href="#action2" className="mx-lg-4 mx-md-3 mx-2">
                {" "}
                Reminders
              </Nav.Link>
              <Nav.Link href="#action2" className="mx-lg-4 mx-md-3 mx-2">
                {" "}
                Community
              </Nav.Link>
              <Nav.Link href="#action2" className="mx-lg-4 mx-md-3 mx-2">
                {" "}
                Lost & Found
              </Nav.Link>
              <Nav.Link href="#action2" className="mx-lg-4 mx-md-3 mx-2">
                {" "}
                Pet Prediction
              </Nav.Link>
              <Nav>
                <Nav.Link href="#user">
                  <FontAwesomeIcon icon={faUser} className={styles.userIcon} />
                </Nav.Link>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
