import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { initDB } from "./initdb";
import routes from "./routes/api";
import { db } from "./services/db";

dotenv.config();

const app = express();
const PORT = process.env.APP_PORT || 3310;

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

app.use("/api", routes);

app.get("/", (_req, res) => {
	res.send("Backend Express en marche");
});

db.getConnection()
	.then(async () => {
		console.log(`Connexion réussie à la base ${process.env.DB_NAME}`);
		await initDB();

		app.listen(PORT, () => {
			console.log(`Serveur lancé sur http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error("Erreur de connexion MySQL :", err);
	});
