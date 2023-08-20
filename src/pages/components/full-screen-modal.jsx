import classNames from "classnames"
import { useRef, useState } from "react"

export const Modal = ({ innerHtml, setModal }) => {
  const [show, setShow] = useState(false)
  const timer = useRef(null)
  const closeModal = (e) => {
    if (e.target.className === 'body') {
      return
    }
    setShow(false)
    timer.current = setTimeout(() => setModal(false), 300)
  }
  useState(() => {
    timer.current = setTimeout(() => setShow(true), 300)
    return () => clearTimeout(timer.current)
  },[])
  return (
    <div className={classNames("modal", {show})} onClick={closeModal}>
      <div className='content'>
        <div className='body' dangerouslySetInnerHTML={{__html: innerHtml}}></div>
        <div className="close" onClick={closeModal}>X</div>
      </div>
    </div>
  )
}
