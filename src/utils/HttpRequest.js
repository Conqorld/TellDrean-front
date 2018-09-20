import Cookie from 'js-cookie'
import {Toast} from 'cube-ui'
export default function(url) {
  let {data = null, methed = 'post', noLogin = false} = arguments.length > 1 ? arguments[1] : {}
  if (!Cookie.get('token') && !noLogin) {
    const toast = Toast.$create({
      time: 2000,
      txt: '请先登陆',
      type:'error'
    })
    toast.show()
    window.location.replace("#/logIn")
  }
  let fetchParams = {
    method: methed,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include' // 将凭证也带上（例如cookies）
  }
  if (data) {
    fetchParams.body = JSON.stringify(data)
  }
  return fetch(url, fetchParams)
    .then(response => {
      return  response.json()
        .then(json => {
          if (response.ok) {
            return json
          } else if (response.status == 402) {
            const toast2 = Toast.$create({
              time: 2000,
              txt: json.err,
              type:'error'
            })
            toast2.show()
            window.location.replace("#/logIn")
          } else {
            return Promise.reject(json)
          }
        })
    })
}
