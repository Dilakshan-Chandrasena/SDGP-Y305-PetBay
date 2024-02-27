import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

import styles from "./footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <MDBFooter
        bgColor="dark"
        className="text-center text-lg-start text-light"
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            <span></span>
          </div>
        </section>

        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <FontAwesomeIcon icon={faPaw} /> PetBay
                </h6>
                <p className="text-justify">
                  Explore the Unified Pet Care System: <br />
                  where pet wellness meets simplicity <br />
                  for a seamless, tail-wagging experience!
                </p>
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Quick Links</h6>
                <p>
                  <a
                    href="#!"
                    className="text-reset"
                    style={{ textDecoration: "none" }}
                  >
                    Home
                  </a>
                </p>
                <p>
                  <a
                    href="#!"
                    className="text-reset"
                    style={{ textDecoration: "none" }}
                  >
                    Preferences
                  </a>
                </p>
                <p>
                  <a
                    href="#!"
                    className="text-reset"
                    style={{ textDecoration: "none" }}
                  >
                    Reminders
                  </a>
                </p>
                <p>
                  <a
                    href="#!"
                    className="text-reset"
                    style={{ textDecoration: "none" }}
                  >
                    Lost & Found
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a
                    href="#!"
                    className="text-reset"
                    style={{ textDecoration: "none" }}
                  >
                    Community
                  </a>
                </p>
                <p>
                  <a
                    href="#!"
                    className="text-reset"
                    style={{ textDecoration: "none" }}
                  >
                    Pet Predictions
                  </a>
                </p>
                <p>
                  <a
                    href="#!"
                    className="text-reset"
                    style={{ textDecoration: "none" }}
                  >
                    Privacy Policy
                  </a>
                </p>
                <p>
                  <a
                    href="#!"
                    className="text-reset"
                    style={{ textDecoration: "none" }}
                  >
                    Help
                  </a>
                </p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Newsletter</h6>
                <div className="d-flex align-items-center justify-content-center mb-4">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="form-control me-2"
                  />
                  <button
                    className="btn btn-outline-light"
                    style={{ backgroundColor: "#74c0fc", border: "none" }}
                  >
                    Subscribe
                  </button>
                </div>
                <div>
                  <a href="" className="me-4 text-reset">
                    <FontAwesomeIcon
                      icon={faFacebook}
                      style={{ color: "#74C0FC", fontSize: "50px" }}
                    />
                  </a>
                  <a href="" className="me-4 text-reset">
                    <FontAwesomeIcon
                      icon={faInstagram}
<<<<<<< HEAD
=======
                      rotation={1}
>>>>>>> 31380f2b522a9cb3e97d9e2dfd5c54404dc9972e
                      style={{ color: "#d40c95", fontSize: "50px" }}
                    />
                  </a>
                  <a href="" className="me-4 text-reset">
                    <FontAwesomeIcon
                      icon={faYoutube}
                      style={{ color: "#ff1f1f", fontSize: "50px" }}
                    />
                  </a>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
        >
          PetBay | All Rights Recerved © 2024
        </div>
      </MDBFooter>
    </div>
  );
}
