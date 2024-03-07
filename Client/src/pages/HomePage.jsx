import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useLocation } from "react-router-dom";

export default function HomePage() {
  const userId = window.localStorage.getItem("userId");

  return (
    <div>
      <Header userId={userId}/>

      <Footer />
    </div>
  );
}
