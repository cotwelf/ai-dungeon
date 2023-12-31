import { useEffect, useState } from "react"
import { postFetch, savePic } from "../utils"
import { Modal } from "./components/full-screen-modal"

const DEFAULT_CHOICE = [
  {
    id: 'a',
    text: '选择 A 选项',
  },
  {
    id: 'b',
    text: '选择 B 选项',
  }
]

const saveRecord = (dialogues) => {
  localStorage.setItem('ai-dungeon-record', `${getRecord()}<br/>${dialogues}`)
}

const getRecord = () => localStorage.getItem('ai-dungeon-record') || ''

export const Dialogue = ({ initDialogue, changePageTo }) => {
  const [choices, setChoices] = useState(null)
  const [dialogue, setDialogue] = useState(initDialogue)
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const postChoice = (type) => {
    if (loading) {
      return
    }
    setChoices(null)
    setDialogue({
      ...dialogue,
      message: '（AI 姬正在绞尽脑汁生成剧情，请稍等一下喵~）'
    })
    saveRecord(`（你选择了 ${type.toUpperCase()}）<br /><br />`)
    setLoading(true)
    postFetch({
      url: `http://10.23.113.44:18080/answer`,
      body: {
        choice: type,
        user: dialogue.user
      }
    }).then(({ message, url, isOver}) => {
      setLoading(false)
      const messageString = message.split('\n').join('<br />')
      setDialogue({ ...initDialogue,
        message: messageString,
        imgUrl: url,
        isOver,
      })
      saveRecord(messageString)
      savePic(url)
      if (!isOver) {
        setChoices(DEFAULT_CHOICE)
      }
    })
  }
  useEffect(() => {
    if (initDialogue) {
      saveRecord(initDialogue.message)
      setChoices(DEFAULT_CHOICE)
    }
  }, [initDialogue])
  return (
    <>
      {modal && <Modal innerHtml={getRecord()} setModal={setModal} />}
      <div className='container' >
        <div className='dialogue-box' >
          <div className='dialogue' dangerouslySetInnerHTML={{ __html: dialogue.message }}></div>
          <div className='btn record' onClick={() => setModal(true)}>剧情回顾</div>
          <div className='btn end' onClick={() => changePageTo('home')}>结束游戏</div>
        </div>
        <img className='bg' src={dialogue.imgUrl} />
      </div>
      {choices ? (
        <div className='choices-modal'>
          {choices.map((choice) => <div className='choice' key={choice.id} onClick={() => postChoice(choice.id)}>{choice.text}</div>)}
        </div>
      ) : null}
    </>
  )
}
