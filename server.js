// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Підключення до бази даних MongoDB
mongoose
  .connect(
    "mongodb+srv://dzubenko:123@cluster0.fjkkmek.mongodb.net/PlayWithSRG",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error:", err));

// Схема для моделі ігор
const gameSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    imageURL: String,
    rating: Number,
  },
  { collection: "games" }
); // Вказуємо ім'я колекції "games"

// Модель для ігор
const Game = mongoose.model("Game", gameSchema);

// Middleware для обробки JSON даних
app.use(bodyParser.json());
app.use(cors());

// Маршрут для отримання списку ігор
app.get("/games", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Маршрут для додавання нової гри
app.post("/games", async (req, res) => {
  const gameData = req.body;
  const game = new Game(gameData);
  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Сервер слухає вказаний порт
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
