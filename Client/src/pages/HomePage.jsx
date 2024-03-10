import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useLocation } from "react-router-dom";
import HeroSection from "../components/LandingPage/Hero/HeroSection";
import Services from "../components/LandingPage/Services/Services";
import "../assets/css/homepage.module.css";
import PromoBanner from "../components/LandingPage/PromoBanner/PromoBanner";
import SubscribtionPlans from "../components/LandingPage/SubscribtionPlans/SubscribtionPlans";

export default function HomePage() {
  const userId = window.localStorage.getItem("userId");

  return (
    <div>
      <Header userId={userId} />
      <HeroSection />
      <Services />
      <PromoBanner />
      <SubscribtionPlans />
      <Footer />
    </div>
  );
}
