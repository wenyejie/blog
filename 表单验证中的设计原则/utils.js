
// 判断一个数据为否为真值
export const isValue = (value) => {
  return value !== null && value !== undefined && value !== '' && (Array.isArray(value) ? value.length !== 0 : true)
}

export const nullObject = () => {
  return Object.create(null)
}

const hasOwnProperty = Object.prototype.hasOwnProperty

// 判断是否拥有该属性
export const hasOwn = (object, property) => {
  if (object === undefined || object === null) {
    return false
  }
  return hasOwnProperty.call(object, property)
}

export const isTrue = (value) => {
  return value === true
}

export const isFalse = (value) => {
  return value === false
}

export const isUndefined = (value) => {
  return value === undefined || value === null
}

export const isDefined = (value) => {
  return value !== undefined && value !== null
}

export const isNumber = (value) => {
  return typeof value === 'number' && !Number.isNaN(value)
}

export const each = (object, fn) => {
  if (Array.isArray(object)) {
    return object.forEach(fn)
  }
  for (let key in object) {
    if (!object.hasOwnProperty(key)) {
      continue
    }
    fn(object[key], key, object)
  }
}

export const extend = (object, key, value) => {
  let result = {}
  if (typeof key === 'object') {
    result = key
  } else if (typeof key === 'string') {
    result[key] = value
  }
  Object.assign(object, result)
}
