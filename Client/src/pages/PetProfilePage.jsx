import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import PetProfile from "../components/PetProfile/PetProfile";
import styles from "../assets/css/petprofilepage.module.css";
import PetRecord from "../components/PetRecords/PetRecord";

export default function PetProfilePage() {
  return (
    <div>
      <Header />
      <PetProfile />
      <PetRecord />
      <Footer />
    </div>
  );
}
