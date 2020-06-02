# this 指向问题

> this 的哲学三问, 我是谁? 我来自哪里? 我要干啥?

`this`这个**关键字**其实是很迷惑的, 因为它不是固定不变的, 而是随着调用方式的改变而改变.

## 前提备要

`globalThis` 代指浏览器`window`和`NODE`的`global`全局对象, 详细请查看:
[globalThis - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis)

## 1. 全局环境

```javascript
console.log(this) // Window
```

在全局环境下, 不管是否为**严格模式**, `this` 都指向`globalThis`

## 2. 直接调用

```javascript
function demo() {
  console.log(this)
}
demo() // Window

function test() {
  function demo() {
    console.log(this)
  }
  demo() // Window
}
test()
```

这个时候`dmeo`作为一个普通函数调用 `this` 指向`globalThis`

PS: 严格模式"`use strict`"下, `this` 为 `undefined`. 如下

```javascript
'use strict'
function demo() {
  console.log(this)
}
demo() // undefined
```

## 3. 对象方法调用

```javascript
const obj = {
  name: 'obj',
  demo() {
    console.log(this) // obj
  }
}
obj.demo() // 'obj'

const demo = obj.demo
demo() // Window
```

这是我身为菜鸟时最迷惑的一点, 都是调用`demo`函数, 为什么输出不一致? **抓头发.jpg**

请记住一句话: **`this`指向是由函数运行时所在的环境所决定, 而不是编译时所在的环境.**

> 你会成为什么样的人跟你出生的环境没一毛钱关系, 而是由你成长的环境所决定.

> this 最终指向哪里, 跟定义的时候没什么关系, 而是由调用的方式所决定

简单理解一下: 一般来说, 老乡是指一个地方来的人. 在国内老乡一般都是同一个省份的人, 在国外老乡一般都是
指国人

`obj.demo`是在 obj 下调用的, 所以它理所当然的指向 obj, 自己人`this`是指 obj `demo = obj.dmeo`, 虽然
都是同一个人说的**自己人**, 但你是在国外说的, 所以一般都指中国人

> 同一句话, 在不同的场合说有不同的含义.

当然从原理上来讲是因为: `obj` 和 `demo`虽然都存储在堆`heap`中, 但是它们是分开存储的, obj 中有指
向`demo`的指针, 但是这个关系是单向的, `demo`并不指向`obj`, 所以`demo`本身是不知道, 自己归属于谁.

爸爸: "给我盛碗饭" `obj: demo () { 给我盛碗饭 }`

妈妈: "给我盛碗饭" `window: demo () { 给我盛碗饭 }`

这里的"**我**"分别代指爸爸和妈妈, 如果只有这两句话, 我们都不知道, 这个"**我**"字到底指谁,

`demo`亦是如此. `this`取决于谁叫它去去做这件事, 在哪里叫

## 4. 构造函数

```javascript
function Demo() {
  this.name = 'demo'
  console.log(this)
}

const instance = new Demo() // Demo
```

当函数被当作构造函数使用时, `this`指向`实例instance`本身, 这个实例是当前被实例化的对象

> 构造函数的原型对象指向当前实例化的对象

## 5. `call`, `apply`, `bind`

```javascript
function demo() {
  console.log(this)
}

demo.apply({ name: 'apply' }) // { name: 'apply' }
demo.call({ name: 'call' }) // { name: 'call' }
demo.bind({ name: 'bind' })() // { name: 'bind' }
```

[apply](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply),
[call](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call),
[bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
三者都是 Function 的原型对象中的方法. 作用就是改变函数的 this 指向.

按照一般函数执行, this 是指向`Window`的, 但是通过这三个函数, 可以主动改变这个指向

## 6. 箭头函数`arrow function`

[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
表达式的语法比函数表达式更简洁，并且没有自己的`this`，`arguments`，`super`或`new.target`。箭头函数表
达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。

```javascript
const test = function() {
  console.log(this)
}
test() // Window

const demo = () => {
  console.log(this)
}
demo() // Window
```

这么一看跟普通函数没有说明区别, 其实是有本质区别的. 函数中的`this`是这个函数本身的, 虽然指向的
是`Window`, 但箭头函数本身是没有自己的`this`的, 这个`this`是继承到上一层中的`this`

举个例子: 虽然都有房子住, 前者房子`this`是自己的, 它对房子`this`拥有产权, 后者的房子`this`是租的, 只
是租赁期间给你用, 但你本身并没有产权

```javascript
// 拥有所有权, 可以自主改造
new test() // test

// 没有所有权, 不能改造
new demo() // Uncaught TypeError: demo is not a constructor
```

## 总结

- 全局环境指向该环境`globalThis`
- 普通函数指向`globalThis`, 严格模式`use strict`指向`undefined`
- 对象方法指向对象本身.
- 构造函数指向实例本身
- `call`, `bind`, `apply`, 会改变函数的`this`指向
- 箭头函数本身没有`this`只是继承上一级的`this`

`this`指向取决于运行时的调用方式和调用者

## 参考文档

- [MDN Web 文档](https://developer.mozilla.org/zh-CN/)
