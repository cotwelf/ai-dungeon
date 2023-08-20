import { useEffect, useRef, useState } from "react"
import { getPic } from "../../utils"
import classNames from "classnames"

export const Collection = () => {
  const collections = useRef(null)
  const [amplifyIndex, setAmplifyIndex] = useState(null)
  useEffect(() => {
    collections.current = getPic()
    return () => {
      collections.current = null
    }
  }, [])
  const amplify = (e, picIndex) => {
    setTimeout(() => {
      setAmplifyIndex(typeof amplifyIndex === "number" ? null : picIndex)
    }, 200)
  }

  return (
    <>
      {collections.current && collections.current.map((collection, index) => {
        return <div
        className={classNames("game-pic collection", {amplifyed: amplifyIndex === index, hide: typeof amplifyIndex === "number" && amplifyIndex !== index})}
        key={`${collection}${index}`}
        style={{backgroundImage: `url(${collection})`}}
        onClick={(e) => amplify(e, index)}
      />
      })}
    </>
  )
}
