import { throttle } from 'lodash'
export const postFetch = throttle((postOpts) => {
  const {
    url,
    body,
    customHeaders,
  } = postOpts
  let headers = {
    "Content-Type": 'application/json',
  }

  headers = {
    ...headers,
    ...customHeaders,
  }

  return fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers,
    body: JSON.stringify(body),
  }).then(response => response.json())
}, 500, { 'trailing': false })

export const saveRecord = (dialogues) => {
  localStorage.setItem('ai-dungeon-record', `${getRecord()}<br/>${dialogues}`)
}

export const getRecord = () => localStorage.getItem('ai-dungeon-record') || ''

export const savePic = (imgUrl) => {
  const prevPic = getPic() || []
  localStorage.setItem('ai-dungeon-pictures', JSON.stringify([...prevPic, imgUrl]))
}

export const getPic = () => {
  try {
    return JSON.parse(localStorage.getItem('ai-dungeon-pictures'))
  } catch {
    return null
  }
}
