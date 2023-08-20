import { useState } from "react"
import classNames from "classnames"
import { Init } from "./components/init"
localStorage.clear()
export const Home = ({ changePageTo, setInitDialogue }) => {
  const [start, setStart] = useState(false)
  return (
    <div className="default-bg home">
      <div className={classNames("init card", {'show': start})} ><Init setInitDialogue={setInitDialogue} changePageTo={changePageTo} /></div>
      <div className={classNames("card", {'show': !start})}>
        <div className="title">AI Dungeon</div>
        <div className="team">- no bug -</div>
        <div className="pages">
          <div onClick={() => {
            setStart(true)
            // changePageTo('init')
          }}>NEW GAME</div>
          <div>LOAD</div>
          <div>COLLECTION</div>
        </div>
      </div>
    </div>
  )
}
