import { useState } from "react"
import classNames from "classnames"
import { Init } from "./components/init"
import { Collection } from "./components/collection"
import { About } from "./components/about-us"
// localStorage.clear()

export const Home = ({ changePageTo, setInitDialogue }) => {
  const [sellected, setSellected] = useState('')
  const returnHome = (e) => {
    if (e.target.className.split(' ').indexOf(sellected) === -1 && e.target.tagName === 'DIV') {
      setSellected('')
    }
  }
  return (
    <div className="default-bg home" onClick={returnHome}>
      <div className={classNames("card about", {'show': sellected === 'about'})} ><About /></div>
      <div className={classNames("card collection", {'show': sellected === 'collection'})}><Collection /></div>
      <div className={classNames("card init", {'show': sellected === 'init'})} ><Init setInitDialogue={setInitDialogue} changePageTo={changePageTo} /></div>
      <div className={classNames("card", {'show': !sellected})}>
        <div className="title">AI Dungeon</div>
        <div className="team">- no bug -</div>
        <div className="pages">
          <div onClick={() => {
            localStorage.removeItem('ai-dungeon-record')
            setSellected('init')
          }}>NEW GAME</div>
          <div onClick={() => {
            setSellected('collection')
          }}>COLLECTION</div>
          <div onClick={() => {
            setSellected('about')
          }}>ABOUT US</div>
          {/* <div>LOAD</div> */}
        </div>
      </div>
    </div>
  )
}
