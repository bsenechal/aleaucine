import axios, { AxiosResponse } from 'axios'
import { cast, flow, types } from 'mobx-state-tree'
import { getApiUrl } from '../helpers/url'
import { Genre } from './genre-store'

export interface Movie {
  poster_path: string
  adult: boolean
  overview: string
  release_date: string
  genre_ids: number[]
  id: number
  original_title: string
  original_language: string
  title: string
  backdrop_path: string
  popularity: number
  vote_count: number
  video: boolean
  vote_average: number
}

export interface MovieDetails extends Movie {
  budget: number
  genres: Genre[]
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  release_date: string
  revenue: number
  runtime: number
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface MovieVideo {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  site: string
  size: number
  type: string
}

export const movieStoreDefaultValue = {
  movies: [],
  movieDetails: {} as MovieDetails,
  movieVideos: [],
}

export const MovieStore = types
  .model({
    movies: types.array(types.frozen<Movie>()),
    movieDetails: types.frozen<MovieDetails>(),
    movieVideos: types.array(types.frozen<MovieVideo>()),
  })
  .actions((self) => {
    const discoverMovie = flow(function* (params) {
      const response: AxiosResponse<{ results: Movie[] }> = yield axios.get(`${getApiUrl()}/discover/movie`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          language: 'en-US',
          ...params,
        },
      })
      self.movies = cast(response.data.results)
    })

    const getMovieDetails = flow(function* (movieId: number) {
      const response: AxiosResponse<MovieDetails> = yield axios.get(`${getApiUrl()}/movie/${movieId}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        },
      })
      self.movieDetails = cast(response.data)
    })

    const getMovieVideos = flow(function* (movieId: number) {
      const response: AxiosResponse<{ results: MovieVideo[] }> = yield axios.get(`${getApiUrl()}/movie/${movieId}/videos`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        },
      })
      self.movieVideos = cast(response.data.results)
    })

    const searchMovie = flow(function* (query: string) {
      const response: AxiosResponse<{ results: Movie[] }> = yield axios.get(`${getApiUrl()}/search/movie`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          query,
        },
      })
      self.movies = cast(response.data.results)
    })

    return { discoverMovie, getMovieDetails, getMovieVideos, searchMovie }
  })
  .views((self) => ({
    get topRated() {
      return self.movies?.reduce(function (prev, current) {
        if (prev.vote_average > current.vote_average) {
          return prev
        }

        if (prev.vote_average === current.vote_average) {
          return prev.vote_count > current.vote_count ? prev : current
        }

        return current
      }, self.movies[0])
    },
  }))
