import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AddGameForm from "./components/AddGameForm";
import GamePage from "./components/GamePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-game" element={<AddGameForm />} />
        <Route path="/game/:id" element={<GamePage />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;

