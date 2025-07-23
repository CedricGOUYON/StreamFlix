import { db } from "../services/db";

export async function getAllMovies() {
	const [rows] = await db.query("SELECT * FROM movies ORDER BY title ASC");
	return rows;
}

export async function addMovie({
	title,
	year,
	image,
	toWatchLater,
}: {
	title: string;
	year: number;
	image?: string;
	toWatchLater?: boolean;
}) {
	await db.query(
		"INSERT INTO movies (title, year, image, toWatchLater) VALUES (?, ?, ?, ?)",
		[title, year, image || "", toWatchLater ? 1 : 0],
	);
}

export async function updateMovie(
	id: number,
	{
		title,
		year,
		image,
		toWatchLater,
	}: { title: string; year: number; image?: string; toWatchLater?: boolean },
) {
	await db.query(
		"UPDATE movies SET title = ?, year = ?, image = ?, toWatchLater = ? WHERE id = ?",
		[title, year, image || "", toWatchLater ? 1 : 0, id],
	);
}

export async function deleteMovie(id: number) {
	await db.query("DELETE FROM movies WHERE id = ?", [id]);
}
