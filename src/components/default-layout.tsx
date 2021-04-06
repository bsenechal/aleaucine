import { Modal } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import React, { ReactNode } from 'react'
import { useStore } from '../store/store'
import { GenreMenu } from './genre-menu'
import { MovieDetail } from './movie-details'
import './default-layout.scss'
import { SearchBar } from './search-bar'

type DefaultLayoutProps = {
  children: ReactNode
}

export const DefaultLayout = observer((props: DefaultLayoutProps) => {
  const { uiStore } = useStore()

  const handleCloseModal = () => {
    uiStore.resetSelectedMovie()
  }

  return (
    <div className='default-layout'>
      <GenreMenu />

      <Modal open={!!uiStore.selectedMovie.id} onClose={handleCloseModal} className='modal-movie-details'>
        <MovieDetail />
      </Modal>

      <div className='content-container'>
        <div className='search-bar'>
          <SearchBar />
        </div>
        <div className='content'>{props.children}</div>
      </div>
    </div>
  )
})
