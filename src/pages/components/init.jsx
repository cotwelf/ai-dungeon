import { useState } from "react"
import { postFetch, savePic } from "../../utils"

export const Init = ({ changePageTo, setInitDialogue }) => {
  const [keyword, setKeyword] = useState(['森林', '美少女', '萤火虫'])
  const [loading, setLoading] = useState(false)
  const keywordOnChange = (e, index) => {
    const currentKeyword = [...keyword]
    currentKeyword[index] = e.target.value
    setKeyword(currentKeyword)
  }
  const getInitDialogue = () => {
    if (loading) {
      return
    }
    const user = Date.now()
    setLoading(true)
    postFetch({
      url: `http://10.23.113.44:18080/init`,
      body: {
        keyword,
        user,
      },
    }).then(({message, url, isOver}) => {
      const messageString = message.split('\n').join('<br />')
      setInitDialogue({
        message: messageString,
        imgUrl: url,
        isOver,
        user,
      })
      // saveRecord(`${messageString}<br />`)
      savePic(url)
      changePageTo('dialogue')
    })
  }

  return (
    <>
      {!loading && <>
        <div>接下来，你将开启一段属于你自己的文字冒险游戏</div>
        <div className="keyword-setting">
          这是一段关于
          <input type="text" placeholder="关键词 1" onChange={(e) => keywordOnChange(e, 0)} value={keyword[0]} />、
          <input type="text" placeholder="关键词 2" onChange={(e) => keywordOnChange(e, 1)} value={keyword[1]} />
          和
          <input type="text" placeholder="关键词 3" onChange={(e) => keywordOnChange(e, 2)} value={keyword[2]} />
          的故事。
        </div>
        <div className="tips">可以修改👆🏻标注底纹的关键词哦~</div>
        <button className="next" onClick={getInitDialogue}>我准备好了~</button>
      </>}
      {loading && <div>AI 姬正在绞尽脑汁生成剧情，请稍等一下喵~</div>}
    </>
  )
}
