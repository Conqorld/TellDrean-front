import Cookie from 'js-cookie'
export default function (url) {
  if (!Cookie.get('token')) {
    console.log('请先登陆')
  }
  let {data = null, methed = 'post'} = arguments.length > 1 ? arguments[1] : {}
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
  return fetch(url, fetchParams).then(response => response.json())
}
