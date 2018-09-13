
export function getStorage (name) {
  return new Promise((resolve, reject) => {
    storage.getItem(name, event => {
      resolve(event)
    })
  })
}

export function setStorage (key, value) {
  return new Promise((resolve, reject) => {
    storage.setItem(key, value, event => {
      resolve(event)
    })
  })
}
