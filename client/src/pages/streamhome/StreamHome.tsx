import "./StreamHome.css";

function StreamHome() {
	return (
		<div className="streamhome">
			<header className="streamhome_header">
				<h1>StreamFlix</h1>
				<button type="button" className="streamhome_signin-btn">
					Se connecter
				</button>
			</header>
			<main className="streamhome_main">
				<div className="streamhome_hero">
					<h1 className="streamhome_title">
						Votre bibliothèque de films, à votre image..
					</h1>
					<h2 className="streamhome_subtitle">
						Ajoutez, gérez et retrouvez facilement tous les films que vous avez
						vus.
					</h2>
					<div className="streamhome_form">
						<a href="/streampage" className="streamhome_btn">
							Accédez à ma bibliothèque
						</a>
						<section className="marquee">
							<p>
								Avatar - Harry Potter - Seigneur des anneaux - Inception -
								Interstellar - Gladiator - Pirates des Caraïbes - Star Wars -
								Jurassic Park - Le Roi Lion - Forrest Gump - Titanic - Dunkerque
								- La La Land - Blade Runner 2049
							</p>
						</section>
					</div>
				</div>
			</main>
		</div>
	);
}

export default StreamHome;
