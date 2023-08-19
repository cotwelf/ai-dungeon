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
}, 5000, { 'trailing': false })
