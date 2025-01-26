import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Layout from "./components/Layout/Layout";
import TestPage from "./pages/TestPage";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Layout>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
