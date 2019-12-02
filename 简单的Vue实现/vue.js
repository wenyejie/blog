import observer from './observer.js'

import compile from './compile.js'

export default class Vue {
  constructor(options) {
    let data
    if (typeof options.data === 'function') {
      data = options.data()
    } else {
      data = options.data
    }

    observer(data, this)

    const el = document.querySelector(options.el)

    console.log(el, [el])

    compile(el, this)
  }
}
