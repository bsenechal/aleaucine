import { types } from 'mobx-state-tree'
import { Genre } from './genre-store'
import { Movie } from './movie-store'

export const uiStoreDefaultValue = {
  selectedGenre: {} as Genre,
  selectedMovie: {} as Movie,
}

export const UiStore = types
  .model({
    selectedGenre: types.frozen<Genre>(),
    selectedMovie: types.frozen<Movie>(),
  })
  .actions((self) => {
    function setSelectedGenre(genre: Genre) {
      self.selectedGenre = genre
    }

    function setSelectedMovie(movie: Movie) {
      self.selectedMovie = movie
    }

    function resetSelectedMovie() {
      self.selectedMovie = {} as Movie
    }
    return { setSelectedGenre, setSelectedMovie, resetSelectedMovie }
  })
