// import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import defaultBg from './assets/default-bg.jpeg'
import './index.scss'
import { useCallback, useEffect, useRef, useState } from 'react'
import { postFetch } from './utils'
import { Dialogue } from './dialogues'
import { Home } from './pages/home'
import { Init } from './init'
// import { }

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

// const DEFAULT_SPEED = 5000

const Dungeon = () => {
  // const [count, setCount] = useState(0)
  const [dialogues, setDialogues] = useState('')
  const [initData, setInitData] = useState(null)
  const [choices, setChoices] = useState(null)
  const [loading, setLoading] = useState(false)
  const [bgImg, setBgImg] = useState(defaultBg)
  const showDialoguesTimer = useRef(null)

  const clearDialoguesInterval = () => {
    if (showDialoguesTimer.current) {
      clearInterval(showDialoguesTimer.current)
      showDialoguesTimer.current = null
    }
  }
  const getInitDialogue = useCallback(() => {
    if (loading || !initData) {
      return
    }
    setLoading(true)
    setDialogues('')
    clearDialoguesInterval()
    postFetch({
      url: `http://10.23.113.44:18080/init`,
      body: initData,
    }).then((res) => {
      setLoading(false)
      // const messageArray = res.message.split('\n')
      // showDialoguesTimer.current = setInterval(() => {
      //   if (messageArray.length > 0) {
      //     setDialogues(prev => `${prev}\n${messageArray.shift()}`)
      //   } else {
      //     clearDialoguesInterval()
      //   }
      // }, DEFAULT_SPEED)
      // setDialogues(res.message)

      setDialogues(res.message.split('\n').join('<br />'))
      setChoices(DEFAULT_CHOICE)
    })
  }, [initData, loading])
  const postChoice = (type) => {
    if (loading) {
      return
    }
    setLoading(true)
    postFetch({
      url: `http://10.23.113.44:18080/answer`,
      body: {
        choice: type,
        user: initData.user
      }
    }).then((res) => {
      setLoading(false)
      setDialogues(res.message.split('\n').join('<br />'))
      setBgImg(res.url)
      setChoices(DEFAULT_CHOICE)
    })
  }
  useEffect(() => {
    if (loading) {
      setDialogues('（AI 姬正在绞尽脑汁生成剧情，请稍等一下喵~）')
      setChoices(null)
    }
  }, [loading])
  useEffect(() => {
    console.log(initData, 'init')
    if (initData) {
      getInitDialogue()
    }
  }, [getInitDialogue, initData])
  return (
    <>
      {<Home />}
      {!initData && <Init setInit={setInitData} />}
      {initData && <Dialogue dialogues={dialogues} bgImg={bgImg} choices={choices} postChoice={postChoice}/>}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Dungeon />
)
