import React from "react";
import { Link } from "react-router-dom";
import "./styles/GameList.css";

const GameList = ({ games }) => {
  return (
    <div className="game-list-container">
      <h1>Game List</h1>
      {games.length === 0 ? (
        <h2>Гри не знайдено</h2>
      ) : (
        <ul>
          {games
            .slice()
            .reverse()
            .map((game) => (
              <Link to={`/game/${game._id}`} key={game._id}>
                <li className="game-item">
                  <h2>{game.title}</h2>
                  <img src={game.imageURL} alt={game.title} />
                  <p>{game.description}</p>
                  <p className="rating">Rating: {game.rating}</p>
                </li>
              </Link>
            ))}
        </ul>
      )}
    </div>
  );
};

export default GameList;
