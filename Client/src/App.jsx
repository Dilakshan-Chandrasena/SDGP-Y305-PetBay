import { useState } from "react";
import Quiz from "./components/Quiz/quiz";
import UploadImage from "./components/Quiz/uploadImage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Quiz />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/UploadImage" element={<UploadImage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
