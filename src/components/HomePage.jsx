import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import GameList from "./GameList";
import axios from "axios";
import "./styles/HomePage.css";
import kmpSearch from "./utils/kmpSearch";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("/api/games")
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  }, []);

  // Використовуємо useMemo для кешування результатів пошуку
  const filteredGames = useMemo(() => {
    if (searchTerm === "") {
      return games;
    } else {
      return kmpSearch(games, searchTerm);
    }
  }, [games, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  return (
    <div className="home-page-container">
      <h1>Welcome to Play with SRG</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a game..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <Link to="/add-game" className="add-game-link">
        Add New Game
      </Link>
      <GameList games={filteredGames} />
    </div>
  );
};

export default HomePage;
