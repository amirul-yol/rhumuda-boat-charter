import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestPage from "./pages/TestPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
