import { Instance, types } from 'mobx-state-tree'
import { createContext, useContext } from 'react'
import { GenreStore, genreStoreDefaultValue } from './genre-store'
import { MovieStore, movieStoreDefaultValue } from './movie-store'
import { UiStore, uiStoreDefaultValue } from './ui-store'

export const RootStore = types.model({
  genreStore: GenreStore,
  movieStore: MovieStore,
  uiStore: UiStore,
})

let _store: any = null

export function initializeStore() {
  _store = RootStore.create({
    genreStore: genreStoreDefaultValue,
    movieStore: movieStoreDefaultValue,
    uiStore: uiStoreDefaultValue,
  })
  return _store
}

export type RootInstance = Instance<typeof RootStore>
const RootStoreContext = createContext<null | RootInstance>(null)
export const Provider = RootStoreContext.Provider

export function useStore(): Instance<typeof RootStore> {
  const store = useContext(RootStoreContext)
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider')
  }
  return store
}
