import { Router } from "express";
import moviesRoutes from "./movies";

const router = Router();

router.get("/", (_req, res) => {
	res.json({ message: "API prête" });
});

router.use("/movies", moviesRoutes);

export default router;
