/**
 * @author: Storm
 * @date: 2019-02-21
 * @email: wenyejie@foxmail.com
 */
import Dep from './dep.js'

export default class Watcher {
  constructor (vm, node, bindName) {
    Dep.target = this

    this.name = bindName
    this.node = node
    this.vm = vm

    this.update()
    Dep.target = null
  }

  get () {
    this.value = this.vm[this.name]
  }

  update () {
    this.get()
    const node = this.node
    const value = this.value
    switch (node.nodeType) {
      case 1:
        node.value = value
        break
      case 4:
        node.nodeValue = value
        break
      default:
        break
    }
  }
}
