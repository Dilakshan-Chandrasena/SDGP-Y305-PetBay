import styles from "../assets/css/auth.module.css";

import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/LogIn");
      console.log("sign out");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      Home
      <div>
        <button className={styles.signOutButton} onClick={logout}>
          <span className={styles.signOutButton}>
            <span className={styles.googleIcon}></span> Sign Out
          </span>
        </button>
      </div>
    </div>
  );
}
