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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/petbay/api/v1/reminders/reminder/" + userId);
        if (response.data.length === 0) {
          console.log('No reminders found.');
          return;
        }

        setReminder(response.data);
        console.log('Reminders fetched:', response.data);
        const currentDateTime = new Date();
        
        response.data.forEach(reminder => {
          const reminderDateTime = new Date(reminder.date + 'T' + reminder.time);
          console.log(reminderDateTime)
          console.log(currentDateTime)

          if (currentDateTime.getTime() === reminderDateTime.getTime()) {
            alert(`Alert: "${reminders.dogName}" Reminder "${reminders.reminderText}" is due on Today!`);
          }
        });
      } catch (error) {
        console.error('Error fetching reminders:', error.message);
      }
    };
    fetchData();

    const intervalId = setInterval(fetchData, 60000); 
    return () => clearInterval(intervalId);
  }, []);
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
