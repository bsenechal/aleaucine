import axios, { AxiosResponse } from 'axios'
import { cast, flow, types } from 'mobx-state-tree'
import { getApiUrl } from '../helpers/url'

export interface Genre {
  id: string
  name: string
}

export const genreStoreDefaultValue = {
  genres: [],
}

export const GenreStore = types
  .model({
    genres: types.array(types.frozen<Genre>()),
  })
  .actions((self) => {
    const fetchAllGenres = flow(function* () {
      const response: AxiosResponse<{ genres: Genre[] }> = yield axios.get(`${getApiUrl()}/genre/movie/list`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: 'en-US',
        },
      })
      self.genres = cast(response.data.genres)
    })

    return { fetchAllGenres }
  })
