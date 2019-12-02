export const emptyObject = Object.freeze({})

export const nullObject = () => {
  return Object.create(null)
}

export const isUndefined = (val) => {
  return val === undefined || val === null
}

export const isDefined = (val) => {
  return val !== undefined && val !== null
}

export const isTrue = (val) => {
  return val === true
}

export const isFalse = (val) => {
  return val === false
}

export const isPrimitive = (val) => {
  const type = typeof val
  return type === 'string' || type === 'number' || type === 'symbol' || type === 'boolean'
}

export const isObject = (val) => {
  return val !== null && typeof val === 'object'
}

export const _toString = Object.prototype.toString

export const toRawType = (val) => {
  return _toString.call(val).slice(8, -1)
}

export const isPlainObject = (val) => {
  return toRawType(val) === 'Object'
}

export const isRegExp = (val) => {
  return toRawType(val) === 'RegExp'
}

export const isPromise = (val) => {
  return isDefined(val) && typeof val.then === 'function' && typeof val.catch === 'function'
}

export const toNumber = (val) => {
  const num = parseFloat(val)
  return Number.isNaN(num) ? val : num
}

export const hasOwnProperty = Object.prototype.hasOwnProperty

export const hasOwn = (obj, key) => {
  return hasOwnProperty.call(obj, key)
}

export const cached = (fn) => {
  const cache = nullObject()
  return function(str) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

// 横杠命名法转驼峰命名发
const camelizeRE = /-(\w)/g
export const camelize = (str) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}
export const camelizeCached = cached(camelize)

// 首字母大写
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export const capitalizeCached = cached(capitalize)

// 驼峰命名法转横杠命名法
const hyphenateRE = /\B([A-Z])/g
export const hyphenate = (str) => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}
export const hyphenateCached = cached(hyphenate)

/**
 * 函数只执行一次
 * @param fn 执行函数
 * @returns {Function}
 */
export const once = (fn) => {
  let called = false
  return function() {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
