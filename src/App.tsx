import React from 'react'
import './App.scss'
import { configure } from 'mobx'
import { DefaultLayout } from './components/default-layout'
import { initializeStore, Provider } from './store/store'
import { MovieList } from './components/movie-list'

configure({
  computedRequiresReaction: true,
  reactionRequiresObservable: true,
  observableRequiresReaction: true,
  disableErrorBoundaries: true,
})

const store = initializeStore()

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Provider value={store}>
          <DefaultLayout>
            <MovieList />
          </DefaultLayout>
        </Provider>
      </header>
    </div>
  )
}

export default App
