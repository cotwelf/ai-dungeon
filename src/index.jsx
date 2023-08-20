// import React from 'react'
import ReactDOM from 'react-dom/client'
import classNames from 'classnames'
import './index.scss'
import { useState } from 'react'
import { Dialogue } from './pages/dialogues'
import { Home } from './pages/home'
import { End } from './pages/end'

// const DEFAULT_SPEED = 5000

const Dungeon = () => {
  // const [count, setCount] = useState(0)
  const [initDialogue, setInitDialogue] = useState({
    message: '',
    imgUrl: '',
    isOver: false,
    user: 0,
  })
  const [page, setPage] = useState('home')
  const [pageChanging, setPageChanging] = useState(false)

  const changePageTo = (page) => {
    const changeTime = 1000
    setPageChanging(true)
    setTimeout(() => setPage(page), changeTime / 2)
    setTimeout(() => setPageChanging(false), changeTime)
  }

  return (
    <>
      {pageChanging && <div className={classNames({'page-changing': pageChanging})} />}
      {page === 'home' && <Home changePageTo={changePageTo} setInitDialogue={setInitDialogue}/>}
      {page === 'dialogue' && <Dialogue changePageTo={changePageTo} initDialogue={initDialogue} />}
      {page === 'end' && <End changePageTo={changePageTo} />}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Dungeon />
)
