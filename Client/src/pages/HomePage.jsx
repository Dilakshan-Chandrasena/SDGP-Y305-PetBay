import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useLocation } from "react-router-dom";
import Image from "react-bootstrap/Image";
import img from "../assets/images/Untitleddesign.png";
import styles from "../assets/css/homepage.module.css"

export default function HomePage() {
  const userId = window.localStorage.getItem("userId");

  return (
    <div>
      <Header userId={userId} />
      <Footer />
    </div>
  );
}
