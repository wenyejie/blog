# 闭包

闭包（closure）是 Javascript 语言的一个难点，也是它的特色，很多高级应用都要依靠闭包实现。

## 前提

要了解闭包, 首先要了解 `Javascript` 中的`作用域`, 作用域即是一个变量的生效范围.

根据变量的生效范围, 变量分为全局变量和局部变量.

全局变量: 整个环境下都可以生效的变量如: `window` 和 `window`下的变量

局部变量: 类似于一个函数中的变量, 出了函数即不起作用

```javascript
Array // 全局变量

function demo() {
  const LENGTH = 10 // 局部变量, 只在fn demo中生效
  Array // it work.
}
```

内部作用域可以调用父级作用域中的变量

当我们调用`function demo`的时候就会生成执行队列, 定义变量`LENGTH`供我们使用, 当`demo`函数执行结束的
时候变量`LENGTH`所占用的内存会被回收, 这个时候我们就不可以访问`LENGTH`

所有的执行队列都是基于它本身所在的环境上的

```javascript
function a() {
  const length = 10
  function b() {
    const name = 'b'
    function c() {
      const age = 20
      console.log(age, name, length)
    }
    c()
  }
  b()
}
a()
```

一层套一层, 函数 c 是在函数 b 的执行队列中新建的. 当然如果这样的嵌套过多. 会严重影响执行效率. 这也
是`递归函数`, 效率低的原因.

在函数 c 中访问`age`, `name`, `length`属性, 如果在当前队列中访问不到, 就层层往上直到找到或者到最顶
层`window`中也访问不到返回错误, 才会中止遍历

**这种访问机制使得, 如果函数 c 不被销毁, 函数 b, 函数 a 永远不会被销毁**

这就引申出一个问题, 如果我们想保留一个内存, 不让它被销毁, 最好的办法就是保留它的引用关系.

即是: 这个内存始终又被引用.

> 这也是内存泄漏的原因所在, 主观上我们是要销毁这个内存, 但是由于代码逻辑原因, 导致未被销毁.

## 如何生成一个不会被销毁的执行环境

当一个函数以及执行过之后, 如果保留里面的执行环境, 让它不会被销毁?

答: **这个执行环境有被需要, 是其它函数的父级函数**

```javascript
function a() {
  const length = 10
  return function b() {
    return length
  }
}
const getLength = a()
```

如上实例代码. 我们可以看出, 因为函数 b 被`return`出去之后有被引用, 导致函数 b 一直有被需要, 所以它和
它所依赖的环境, 永远不会被回收. 即使是函数 a 已经执行过了, `函数a`执行时所创建的环境还是一直存在

简化一下, `函数a`不是我们所需要的, 我们仅仅需要函数 b, 所以我们可以使用`自执行`函数来替代

```javascript
const getLength = (function() {
  const LENGTH = 10
  return function() {
    return LENGTH
  }
})()

console.log(getLength()) // 10
```

这种保留环境的做法, 就叫做`闭包(closure)`.

闭包是一个相对封闭的环境, 它跟外部环境隔绝, 不会被外部环境所影响, 也不会被回收.

闭包的作用就是, 读取和处理内部数据, 并使它们永远保存在内存中不被销毁.

闭包使用非常广泛.

缺点就是. 很耗内存, 因为一个函数比如`函数a`不是简单的只有`LENGTH`属性, 函数本身还有`this`,
`arguments`, `super`, `new.target`等隐藏属性. 还是生成一个执行队列

## 示例

闭包一个很典型的作用就是缓存数据

```javascript
/**
 * 缓存执行结果, 当结果输入相同时, 不再执行
 * @param fn
 */
const cached = (fn) => {
  const caches = {}
  return function() {
    const args = Array.prototype.join.call(arguments, ',')
    if (args in caches) {
      return caches[args]
    }
    return (caches[args] = fn.apply(this, arguments))
  }
}

const doSomething = cached((name) => {
  // ......
  // 经过一些列艰苦运算, 返回结果
  return name + Date.now()
})

doSomething('test') // test1590737515074
doSomething('test') // test1590737515074
doSomething('test') // test1590737515074
doSomething('test') // test1590737515074
```

因为会换成数据, 当输入相同的参数时, 不会重新执行函数, 而是直接从缓存中, 读取到相关存储结果直接返回.

## 参考文档

- [学习 Javascript 闭包（Closure） - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)
