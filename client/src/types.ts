export type Movie = {
	id: number;
	title: string;
	year: number;
	image: string;
	streamUrl?: string;
	toWatchLater?: boolean;
};
