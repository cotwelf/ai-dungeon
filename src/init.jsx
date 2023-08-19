import { useState } from "react"

const welcomeDialogue = ['接下来，你将开启一段属于你自己的文字冒险游戏']

const userId = Date.now()

export const Init = ({ setInit }) => {
  const [dialogue, setDialogue] = useState(welcomeDialogue[0])
  const [keyword, setKeyword] = useState(['龙宫城', '美少女', '敲代码'])
  const keywordOnChange = (e, index) => {
    console.log(e.target.value, index)
    const currentKeyword = [...keyword]
    currentKeyword[index] = e.target.value
    setKeyword(currentKeyword)
  }
  return (
    <>
    <div className="init">
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
      <div className="next" onClick={() => {
        setInit({
          keyword,
          user: userId,
        })
      }}>我准备好了~</div>
    </div>
    </>
  )
}
