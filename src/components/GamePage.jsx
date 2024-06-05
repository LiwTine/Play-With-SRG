import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./styles/GamePage.css";
const GamePage = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/games/`)
      .then((response) => {
        setGame(response.data.find((game) => game._id === id));
      })
      .catch((error) => {
        console.error("Error fetching game:", error);
      });
  }, [id]);

  if (!game) {
    return <div>Завантаження...</div>;
  }

  return (
    <div className="game-page-container">
      <h1>{game.title}</h1>
      <img src={game.imageURL} alt={game.title} />
      <p className="description">{game.description}</p>
      <p className="rating">Rating: {game.rating}</p>
    </div>
  );
};

export default GamePage;
