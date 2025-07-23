import { Router } from "express";
import {
	addMovie,
	deleteMovie,
	getAllMovies,
	updateMovie,
} from "../Repositories/moviesrepository";

const router = Router();

router.get("/", async (_req, res) => {
	try {
		const movies = await getAllMovies();
		res.json(movies);
	} catch (error) {
		console.error("Erreur GET /movies", error);
		res.status(500).json({ error: "Erreur serveur" });
	}
});

router.post("/", async (req, res) => {
	try {
		const { title, year, image, toWatchLater } = req.body;
		if (!title || !year) {
			return res
				.status(400)
				.json({ error: "Le titre et l'année sont requis." });
		}
		await addMovie({ title, year, image, toWatchLater });
		res.status(201).json({ message: "Film ajouté" });
	} catch (error) {
		res
			.status(500)
			.json({ error: error || "Erreur serveur lors de l'ajout du film." });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { title, year, image, toWatchLater } = req.body;
		if (!title || !year) {
			return res
				.status(400)
				.json({ error: "Le titre et l'année sont requis." });
		}
		await updateMovie(parseInt(id), { title, year, image, toWatchLater });
		res.json({ message: "Film modifié" });
	} catch (error) {
		console.error("Erreur PUT /movies/:id", error);
		res
			.status(500)
			.json({ error: "Erreur serveur lors de la modification du film." });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await deleteMovie(parseInt(id));
		res.json({ message: "Film supprimé" });
	} catch (error) {
		console.error("Erreur DELETE /movies/:id", error);
		res
			.status(500)
			.json({ error: "Erreur serveur lors de la suppression du film." });
	}
});

export default router;
