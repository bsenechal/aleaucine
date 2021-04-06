import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Movie } from '../store/movie-store'
import { useStore } from '../store/store'

export const SearchBar = observer(() => {
  const { movieStore } = useStore()

  // need to debounce this function
  const handleSearch = ({ target: { value } }: any) => {
    movieStore.searchMovie(value)
  }

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={movieStore.movies.map((movie: Movie) => movie.title)}
      onKeyDown={handleSearch}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Search Movie'
          margin='normal'
          variant='outlined'
          InputProps={{ ...params.InputProps, type: 'search' }}
        />
      )}
    />
  )
})
