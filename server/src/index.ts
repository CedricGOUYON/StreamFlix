import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mysql from "mysql2/promise";
import routes from "./routes/api";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3310;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// Routes API
app.use("/api", routes);

// Ping principal
app.get("/", (_req, res) => {
  res.send("Backend Express en marche ✅");
});

// Connexion MySQL + message terminal
mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })
  .then(() => {
    console.log(`🗄️ using database ${process.env.DB_NAME}`);
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion MySQL :", err);
  });

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
