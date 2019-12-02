import { isUndefined } from './common.js'

export const arrRemove = (array, item) => {
  if (Array.isArray(array) && array.length) {
    const index = array.indexOf(item)
    if (index > -1) {
      array.splice(index, 1)
    }
  }
  return array
}

export const arrToogle = (array, item) => {
  if (Array.isArray(array) && array.length) {
    const index = array.indexOf(item)
    if (index > -1) {
      array.splice(index, 1)
    } else {
      array.push(item)
    }
  }
  return array
}

export const arrFindByProp = (array, key, value, returnKey) => {
  if (!Array.isArray(array) || isUndefined(key) || isUndefined(value)) {
    return
  }
  const item = array.find((item) => item[key] === value)
  if (!item) {
    return
  }

  return returnKey ? item[returnKey] : item
}
