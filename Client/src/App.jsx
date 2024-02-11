import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import HomePage from "./components/HomePage";
import GetUserDetails from "./components/GetUserDetails";
import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<LogIn />} />
            <Route path="/LogIn" element={<LogIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route
              path="/GetUserDetails/:userId/:email"
              element={<GetUserDetails />}
            />
            <Route path="/HomePage" element={<HomePage />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
