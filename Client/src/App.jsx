import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/HomePage";
import GetUserDetails from "./components/UserDetails/GetUserDetails";

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
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
