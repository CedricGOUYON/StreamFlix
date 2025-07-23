import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import type { Movie } from "../../types";
import "./StreamPage.css";

export default function MoviePage() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [title, setTitle] = useState("");
	const [year, setYear] = useState("");
	const [image, setImage] = useState("");
	const [search, setSearch] = useState("");
	const [editId, setEditId] = useState<number | null>(null);
	const [toWatchLater, setToWatchLater] = useState(false);
	const navigate = useNavigate();

	const fetchMovies = useCallback(async () => {
		try {
			const res = await fetch("/api/movies");
			if (!res.ok) throw new Error("Erreur lors du chargement");
			const data = await res.json();
			setMovies(data);
		} catch (err) {
			console.error("Erreur chargement films :", err);
			toast.error("Échec du chargement des films");
		}
	}, []);

	useEffect(() => {
		fetchMovies();
	}, [fetchMovies]);

	const handleAdd = async () => {
		try {
			const res = await fetch("/api/movies", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title: title.trim(),
					year: parseInt(year.trim()),
					image: image.trim() || "",
					toWatchLater,
				}),
			});
			if (!res.ok) throw new Error("Erreur ajout film");
			setTitle("");
			setYear("");
			setImage("");
			setToWatchLater(false);
			toast.success("Film ajouté !");
			fetchMovies();
		} catch (err) {
			console.error("Erreur ajout film :", err);
			toast.error("Impossible d’ajouter le film");
		}
	};

	const handleDelete = async (id: number) => {
		try {
			const res = await fetch(`/api/movies/${id}`, { method: "DELETE" });
			if (!res.ok) throw new Error("Erreur suppression film");
			toast.success("Film supprimé");
			fetchMovies();
		} catch (err) {
			console.error("Erreur suppression film :", err);
			toast.error("Échec de la suppression");
		}
	};

	const handleEdit = (movie: Movie) => {
		setEditId(movie.id);
		setTitle(movie.title);
		setYear(movie.year.toString());
		setImage(movie.image);
		setToWatchLater(movie.toWatchLater ?? false);
	};

	const handleUpdate = async () => {
		try {
			const res = await fetch(`/api/movies/${editId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title,
					year: parseInt(year),
					image,
					toWatchLater,
				}),
			});
			if (!res.ok) throw new Error("Erreur update film");
			setEditId(null);
			setTitle("");
			setYear("");
			setImage("");
			setToWatchLater(false);
			toast.success("Film modifié !");
			fetchMovies();
		} catch (err) {
			console.error("Erreur update film :", err);
			toast.error("Impossible de modifier le film");
		}
	};

	const filteredMovies = movies.filter((m) =>
		m.title.toLowerCase().includes(search.toLowerCase()),
	);

	const handleGoBack = () => {
		navigate("/");
	};

	return (
		<div className="movie-page">
			<h1>Ma bibliothèque StreamFlix</h1>
			<button type="button" onClick={handleGoBack} className="btn-back">
				← Accueil
			</button>
			<div className="sticky-bar">
				<div className="search">
					<input
						type="text"
						placeholder="Rechercher un film..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className="form">
					<input
						type="text"
						placeholder="Titre"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<input
						type="number"
						placeholder="Année"
						value={year}
						onChange={(e) => setYear(e.target.value)}
					/>
					<input
						type="text"
						placeholder="URL image"
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/>
					<label>
						<input
							type="checkbox"
							className="checkbox-custom"
							checked={toWatchLater}
							onChange={(e) => setToWatchLater(e.target.checked)}
						/>
						À voir plus tard
					</label>
					{editId ? (
						<button type="button" onClick={handleUpdate}>
							Modifier le film
						</button>
					) : (
						<button type="button" onClick={handleAdd}>
							Ajouter le film
						</button>
					)}
					<div></div>
					<p className="selection hide-on-mobile">
						Voici une sélection, à vous maintenant de l’enrichir, de la
						personnaliser, de la modifier ou de la supprimer… "
					</p>
					<p className="view hide-on-mobile">et surtout de la visionner !</p>
				</div>
			</div>
			<div className="movies">
				{filteredMovies.map((movie) => (
					<div key={movie.id} className="movie-card">
						{movie.image ? (
							<img src={movie.image} alt={movie.title} width="100" />
						) : (
							<div>Pas d’image</div>
						)}
						<h3>{movie.title}</h3>
						<p>{movie.year}</p>
						<p className={movie.toWatchLater ? "to-watch-later" : "watched"}>
							{movie.toWatchLater ? "À voir plus tard" : "Déjà vu"}
						</p>
						<button type="button" onClick={() => handleEdit(movie)}>
							Modifier
						</button>
						<button type="button" onClick={() => handleDelete(movie.id)}>
							Supprimer
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
