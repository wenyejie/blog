/**
 * @author: Storm
 * @date: 2019-03-08
 * @email: wenyejie@foxmail.com
 */
import { observer } from './observer.js'
import { compile } from './compile.js'

class Mvvm {
  constructor (options) {
    this.$el = document.querySelector(options.el)
    let data
    if (typeof options.data === 'function') {
      data = options.data()
    } else if (typeof options.data === 'object') {
      data = options.data
    }
    this.$watcher = {}
    observer(this, data)
    compile(this, this.$el)
  }
}

export default Mvvm
