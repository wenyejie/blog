import Watcher from './watcher.js'

const defineReactive = (vm, name, value) => {
  const watcher = new Watcher()
  vm.$watcher[name] = watcher
  Object.defineProperty(vm, name, {
    get() {
      console.log('defineReactive get', name, value)
      return value
    },
    set(newVal) {
      if (newVal === value) return
      value = newVal
      watcher.update()
      console.log('defineReactive set', name, newVal)
      return value
    }
  })
}

export const observer = (vm, data) => {
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      defineReactive(vm, key, data[key])
    }
  }
}
