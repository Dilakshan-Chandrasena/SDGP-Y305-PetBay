import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import LogIn from "./pages/LogInPage";
import SignUp from "./pages/SignUpPage";
import Home from "./pages/HomePage";
import GetUserDetails from "./pages/GetUserDetailsPage";
import Reminder from './pages/ReminderPage';
import { React, useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [reminders, setReminder] = useState([]);
  const { userId } = useParams();
  
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
            <Route path="/reminder/:userId" element={<Reminder />} />          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
