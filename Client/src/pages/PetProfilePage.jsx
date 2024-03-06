import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import PetProfile from "../components/PetProfile/PetProfile";
import styles from "../assets/css/petprofilepage.module.css";
import PetRecord from "../components/PetRecords/PetRecord";
import { useAuth } from "../contexts/authContext";

export default function PetProfilePage() {
  const { userId } = useAuth();

  return (
    <div>
      <Header userId = {userId} />
      <PetProfile />
      <PetRecord />
      <Footer />
    </div>
  );
}
