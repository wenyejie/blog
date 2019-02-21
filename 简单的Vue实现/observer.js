/**
 * @author: Storm
 * @date: 2019-02-21
 * @email: wenyejie@foxmail.com
 */

import Dep from './dep.js'

function defineReactive (object, key, value) {
  const dep = new Dep()
  Object.defineProperty(object, key, {
    get () {
      console.log('defineReactive get =>', value)
      if (Dep.target) {
        dep.add(Dep.target)
      }
      return value
    },
    set (newValue) {
      if (newValue === value) return
      value = newValue
      dep.notify()
      console.log('defineReactive set =>', newValue)
    }
  })
}

export default function observer (object, vm) {
  Object.keys(object).forEach(key => {
    defineReactive(vm, key, object[key])
  })
}


