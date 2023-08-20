// import React from 'react'
import ReactDOM from 'react-dom/client'
import classNames from 'classnames'
import './index.scss'
import { useState } from 'react'
import { Dialogue } from './pages/dialogues'
import { Home } from './pages/home'

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
    const changeTime = 500
    setPageChanging(true)
    setTimeout(() => setPage(page), changeTime)
    setTimeout(() => setPageChanging(false), changeTime * 2)
  }

  return (
    <>
      <div className={classNames('page-changing', {'show': pageChanging})} />
      {page === 'home' && <Home changePageTo={changePageTo} setInitDialogue={setInitDialogue}/>}
      {page === 'dialogue' && <Dialogue changePageTo={changePageTo} initDialogue={initDialogue} />}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Dungeon />
)
