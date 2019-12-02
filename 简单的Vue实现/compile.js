import Watcher from './watcher.js'

function compile(node, vm) {
  const reg = /\{\{(.*)\}\}/
  if (node.nodeType === 1) {
    //节点类型为元素节点
    const attr = node.attributes //对所有属性进行解析
    for (let i = 0; i < attr.length; i++) {
      if (attr[i].nodeName === 'v-model') {
        const bindName = attr[i].nodeValue
        //将元素与数据绑定
        node.value = vm[bindName]
        node.addEventListener('input', function(e) {
          vm[bindName] = e.target.value
          console.log(vm, vm[bindName], e.target.value)
        })
        new Watcher(vm, node, bindName)
        node.removeAttribute('v-model')
      }
    }
    convertNode(node, vm)
  }
  if (node.nodeType === 3) {
    //节点类型为文本节点
    if (reg.test(node.nodeValue)) {
      const bindName = RegExp.$1.trim()
      node.nodeValue = vm[bindName]
      new Watcher(vm, node, bindName) //为该页面元素node生产watcher
    }
  }
}

export default function convertNode(node, vm, fragment) {
  node.childNodes.forEach((node) => compile(node, vm, fragment))
}
