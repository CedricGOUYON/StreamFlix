import type { RowDataPacket } from "mysql2";
import { db } from "./services/db";

export async function initDB() {
	try {
		await db.query(`
      CREATE TABLE IF NOT EXISTS movies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        year INT NOT NULL,
        image VARCHAR(512),
        toWatchLater BOOLEAN DEFAULT FALSE
      )
    `);

		const [rows] = await db.query<RowDataPacket[]>(
			"SELECT COUNT(*) as count FROM movies",
		);
		const count = (rows[0] as { count: number }).count;

		if (count === 0) {
			const demoMovies: [string, number, string, number][] = [
				[
					"Avatar",
					2009,
					"https://antreducinema.fr/wp-content/uploads/2022/02/avatar-fr.jpg",
					1,
				],
				[
					"Harry Potter - à l'école des sorciers",
					2001,
					"https://antreducinema.fr/wp-content/uploads/2020/04/Harry_Potter_a_l_ecole_des_sorciers.jpg",
					1,
				],
				[
					"Seigneur des anneaux",
					2003,
					"https://antreducinema.fr/wp-content/uploads/2022/03/affiche2.jpg-r_1920_1080-f_jpg-q_x-xxyxx-1.jpg",
					1,
				],
				[
					"Inception",
					2010,
					"https://antreducinema.fr/wp-content/uploads/2021/04/inception-350x470.jpg",
					1,
				],
				[
					"Interstellar",
					2014,
					"https://antreducinema.fr/wp-content/uploads/2020/04/INTERSTELLAR-350x476.jpg",
					1,
				],
				[
					"Gladiator",
					2000,
					"https://antreducinema.fr/wp-content/uploads/2022/02/gladiator-350x467.jpg",
					1,
				],
				[
					"Pirates des Caraïbes - La Malédiction du Black Pearl",
					2003,
					"https://antreducinema.fr/wp-content/uploads/2022/03/affiche2.jpg-r_1920_1080-f_jpg-q_x-xxyxx-350x467.jpg",
					1,
				],
				[
					"Star Wars - Épisode IV - Un Nouvel Espoir",
					1977,
					"https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg",
					1,
				],
				[
					"Jurassic Park",
					1993,
					"https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg",
					1,
				],
				[
					"Le Roi Lion",
					1994,
					"https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg",
					1,
				],
				[
					"Forrest Gump",
					1994,
					"https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
					1,
				],
				[
					"Titanic",
					1997,
					"https://antreducinema.fr/wp-content/uploads/2020/04/Titanic-350x479.jpg",
					1,
				],
				[
					"Dunkerque",
					2017,
					"https://upload.wikimedia.org/wikipedia/en/1/15/Dunkirk_Film_poster.jpg",
					1,
				],
				[
					"La La Land",
					2016,
					"https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png",
					1,
				],
				[
					"Blade Runner 2049",
					2017,
					"https://antreducinema.fr/wp-content/uploads/2020/04/BLADE-RUNNER-2049-scaled-350x525.jpg",
					1,
				],
			];

			const placeholders = demoMovies.map(() => "(?, ?, ?, ?)").join(", ");
			const values = demoMovies.flat();

			await db.query(
				`INSERT INTO movies (title, year, image, toWatchLater) VALUES ${placeholders}`,
				values,
			);
		}
	} catch (error) {
		console.error("Erreur initDB :", error);
	}
}
