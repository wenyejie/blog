const replaceReg = /(\{\{.*\}\})/

class Watcher {
  constructor() {
    this.subscribes = []
  }

  add(vm, el, name, template) {
    this.subscribes.push({ vm, el, name, template })
  }

  update() {
    const copies = this.subscribes.concat()
    copies.forEach(({ vm, el, name, template }) => {
      const { nodeType } = el
      const value = vm[name]
      switch (nodeType) {
        case 1:
          el.value = value
          break
        case 3:
          el.nodeValue = template.replace(replaceReg, value)
          break
        default:
          break
      }
    })
  }

  notify() {}
}

export default Watcher
