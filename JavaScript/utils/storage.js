/**
 * @author: Storm
 * @date: 2019/5/8
 * @email: wenyejie@foxmail.com
 */

import { emptyObject } from './common.js'
import { inBrowser } from './env.js'

const storage = (name) => {
  const s = inBrowser ? window[`${name}Storage`] : emptyObject
  return {
    get (key) {
      return (JSON.parse(s.getItem(key)) || emptyObject).value
    },

    set (key, value) {
      s.setItem(key, JSON.stringify({ value }))
    },

    remove (key) {
      s.removeItem(key)
    },

    clear () {
      s.clear()
    },

    length () {
      return s.length
    }
  }
}

export const local = storage('local')

export const session = storage('session')
