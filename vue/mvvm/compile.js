const reg = /\{\{(.*)\}\}/
const replaceReg = /(\{\{.*\}\})/

const compileNode = (vm, node) => {
  const { nodeType, nodeValue } = node

  console.log(nodeType, nodeValue, node)

  switch (nodeType) {
    case 1:
      loopAttrs(vm, node)
      loopNodes(vm, node)
      break
    case 3:
      if (reg.test(nodeValue)) {
        console.log(RegExp.$1, RegExp.$2)
        const name = RegExp.$1.trim()
        node.nodeValue = nodeValue.replace(replaceReg, vm[name])
        vm.$watcher[name].add(vm, node, name, nodeValue)
      }
      break
    default:
      break
  }
}

const compileAttr = (vm, node, attr) => {
  const { name, nodeValue } = attr

  switch (name) {
    case 'v-model':
      node.value = vm[nodeValue]
      node.addEventListener('input', (event) => {
        vm[nodeValue] = event.target.value
      })
      vm.$watcher[nodeValue].add(vm, node, nodeValue)
      break
    default:
      break
  }
}

const loopNodes = (vm, node) => {
  node.childNodes.forEach((node) => compileNode(vm, node))
}

const loopAttrs = (vm, node) => {
  const { attributes } = node
  const length = attributes.length

  for (let i = 0; i < length; i++) {
    compileAttr(vm, node, attributes[0])
  }
}

export const compile = (vm, $el) => {
  console.log({ $el })
  loopNodes(vm, $el)
}
