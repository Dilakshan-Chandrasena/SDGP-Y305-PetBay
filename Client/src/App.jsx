import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import LogIn from "./pages/LogInPage";
import SignUp from "./pages/SignUpPage";
import Home from "./pages/HomePage";
import GetUserDetails from "./pages/GetUserDetailsPage";
import Pets from "./pages/PetsPage";
import PetProfile from "./pages/PetProfilePage";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<LogIn />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/getuserdetails" element={<GetUserDetails />} />
            <Route path="/home" element={<Home />} />
            <Route path="/pets/:userId" element={<Pets />}/>
            <Route path="/pet-profile/:petId" element={<PetProfile />} />
            <Route path="/Quiz" element={<Quiz />} />
            <Route path="/UploadImage" element={<UploadImage />} />

          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
