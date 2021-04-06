import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../store/store'
import { Genre } from '../store/genre-store'
import { List, ListItem } from '@material-ui/core'

export const GenreMenu = observer(() => {
  const { genreStore, uiStore } = useStore()

  useEffect(() => {
    genreStore.fetchAllGenres()
  }, [genreStore])

  const handleClickGenre = (genre: Genre) => {
    uiStore.setSelectedGenre(genre)
  }

  return (
    <div className='left-menu'>
      <List>
        {genreStore.genres.map((genre: Genre) => (
          <ListItem button key={genre.id} onClick={() => handleClickGenre(genre)}>
            {genre.name}
          </ListItem>
        ))}
      </List>
    </div>
  )
})
