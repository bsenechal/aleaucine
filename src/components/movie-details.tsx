import { List, ListItemText } from '@material-ui/core'
import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../store/store'
import YouTube from 'react-youtube'
import './movie-details.scss'

export const MovieDetail = observer(() => {
  const { movieStore, uiStore } = useStore()

  useEffect(() => {
    movieStore.getMovieDetails(uiStore.selectedMovie.id)
    movieStore.getMovieVideos(uiStore.selectedMovie.id)
  }, [movieStore, uiStore.selectedMovie])
  const videoId = movieStore.movieVideos.length >= 1 ? movieStore.movieVideos[0].key : null

  return movieStore.movieDetails ? (
    <div className='movie-details'>
      {videoId && <YouTube videoId={videoId} />}

      <div className='text'>
        <h2>{movieStore.movieDetails.title}</h2>

        <List>
          <ListItemText>
            <b>Original Title:</b> {movieStore.movieDetails.original_title}
          </ListItemText>
          {movieStore.movieDetails.tagline && (
            <ListItemText>
              <b>Tagline:</b> {movieStore.movieDetails.tagline}
            </ListItemText>
          )}

          {movieStore.movieDetails.release_date && (
            <ListItemText>
              <b>Release date:</b> {movieStore.movieDetails.release_date}
            </ListItemText>
          )}

          {movieStore.movieDetails.overview && (
            <ListItemText>
              <b>Overview:</b> {movieStore.movieDetails.overview}
            </ListItemText>
          )}
          {movieStore.movieDetails.budget && (
            <ListItemText>
              <b>Budget:</b> {movieStore.movieDetails.budget}
            </ListItemText>
          )}
        </List>
      </div>
    </div>
  ) : null
})
