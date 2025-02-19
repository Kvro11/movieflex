export interface Show {
  id: number;
  name: string;
  poster_path?: string | null;
}

export interface CatalogListProps {
  title: string;
  toggleGenre: () => void;
  fetchMoreShow: (nextPage: number) => void;
  onGenreSelect: (genreId: number) => void;
  isNavOpen: boolean;
  genreState: any[]; // Define a proper type here
  state: Show[];
}
