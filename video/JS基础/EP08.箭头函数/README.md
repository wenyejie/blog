# 箭头函数

箭头函数是`ES6(ES2015)`新增一种函数表达式. 顾名思义, 有箭头的函数, 它的语法更简洁.

## 写法上更简洁

```javascript
const arrowFunction = () => {}

const ordinaryFunction = function() {}

console.log(arrowFunction) // () => {}
console.log(ordinaryFunction) // ƒ () {}
```

从 demo 中可以看出

- 是一个函数; 跟普通函数一样都是 `Function` 的实例
- 是一个用箭头表达的函数; 写法上更简洁, 少了关键字`function`
- `控制台`中输出的也不一样

箭头函数在只有一行的情况下可以省略花括号`{}`和`return`关键字, 在只有一个参数的情况下还可以省略圆括
号`()`

```javascript
const arrowFunction = (a) => a + 1
const arrowFunctionA = (a, b) => a + b
```

## 没有原型对象\构造方法

> 相比起普通函数, 箭头函数更加轻量, 箭头函数抛弃了很多东西

```javascript
arrowFunction.prototype // undefined

ordinaryFunction.prototype // {constructor: ƒ}
```

箭头函数没有`原型对象`, 自然原型对象中的`constructor`方法也是没有的. 所以它不能作为构造函数使用

```javascript
new arrowFunction() // Uncaught TypeError: arrowFunction is not a constructor

new ordinaryFunction() // it work.
```

## 没有`this`/`arguments`

```javascript
const arrowFunction = () => {
  console.log(arguments)
}
const ordinaryFunction = function() {
  console.log(arguments)
}
arrowFunction() // Uncaught ReferenceError: arguments is not defined
ordinaryFunction() // it work.
```

箭头函数不支持`arguments`, 开发中可以使用`...rest`代替

虽然在箭头函数中可以调用`this`, 但这个 this 不是箭头函数本身所拥有的. 只是调用上级环境中的 this

## 使用场景

- 递归; 因为它更轻量, 所以递归时, 生成的执行队列更简洁, 消耗更小, 如果要递归 1000 次, 则减少了 1000
  份消耗
- 大量匿名函数; 如 `.map`, `.filter`, `find`中使用, 事件回调
- 在不需要`argument`和自身`this`中的普通函数中
- 需要使用上级`this`的场景中, 如构造函数, `class` 对象函数中

## ES5

```javascript
function demo() {
  const a = () => {
    console.log(this)
  }

  // 约等于

  const that = this
  const b = function() {
    console.log(that)
  }
}
```

可以说, 箭头函数, 是用的最多的 ES6 特性(之一), 随便找个项目搜索一下, 都是 `100+`, `500+`

当然就目前而言很多项目中, 写成 ES6, 最终到了线上还是编译成 ES5, 但在`webpack`中使用 `modern`可以使代
码编译成两份, 一份支持旧浏览器, 一份支持现代浏览器

## 参考文档

- [箭头函数 - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
