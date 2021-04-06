import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../store/store'
import { Movie } from '../store/movie-store'
import { GridList, GridListTile, GridListTileBar, IconButton } from '@material-ui/core'
import { getImageFullUrl } from '../helpers/url'
import './movie-list.scss'

export const MovieList = observer(() => {
  const { uiStore, movieStore } = useStore()

  useEffect(() => {
    movieStore.discoverMovie({ with_genres: uiStore.selectedGenre.id, include_video: true })
  }, [movieStore, uiStore.selectedGenre])

  const handleClickMovie = (movie: Movie) => {
    uiStore.setSelectedMovie(movie)
  }
  return (
    <div>
      <h3>{uiStore.selectedGenre.name}</h3>
      <GridList cols={4}>
        {movieStore.movies.map((movie: Movie) => (
          <GridListTile key={movie.id} className='movie-card' onClick={() => handleClickMovie(movie)}>
            <img src={getImageFullUrl(movie.poster_path)} alt={movie.title} loading='lazy' />
            <GridListTileBar title={movie.title} actionIcon={<IconButton aria-label={`info about ${movie.title}`}></IconButton>} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
})
