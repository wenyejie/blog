# 递归函数

递归函数即在函数内部直接或间接调用函数本身. 递归函数本质是一个循环.

## 简介

递归指由一种（或多种）简单的基本情况定义的一类对象或方法，并规定其他所有情况都能被还原为其基本情况。

## 简单对比

```javascript
// 普通的循环
const loop = () => {
  let sum = 0
  for (let i = 0; i <= 100000; i++) {
    sum += i
  }
  return sum
}

// 递归循环
function demo(i = 0, sum = 0) {
  if (i <= 100000) {
    sum += i
    return demo(++i, sum)
  } else {
    return sum
  }
}
// console.log(demo())

const test = (fn) => {
  console.time('test')
  fn()
  console.timeEnd('test')
}

test(loop) // 7.5 ~ 8.5ms
test(demo) // 47 ~ 49ms
```

如上测试, 同一个结果的普通 for 循环和递归循环, 递归耗时多 `6~7` 倍

耗时的原因是, 在递归中, 没循环一次就新生成一个`执行栈` 所有的函数`demo`都是基于上一个循环之上的, 根据`闭包`的原理, 如此
叠加, 这是导致性能低下的原因

## 斐波拉契数列

有个有很经典的题目, 求`斐波拉契数列`

**示例一:**

```javascript
const fibonacciSequence = (n) => {
  if (n === 1 || n === 2) {
    return 1
  }
  return fibonacciSequence(n - 2) + fibonacciSequence(n - 1)
}
console.log(fibonacciSequence(10)) // 55; 执行时间: 约0.19ms
console.log(fibonacciSequence(20)) // 6765; 执行时间: 约1.2ms
console.log(fibonacciSequence(30)) // 832040; 执行时间: 约6.8ms
console.log(fibonacciSequence(40)) // 102334155; 执行时间: 约636ms
console.log(fibonacciSequence(50)) // 直接卡死
```

看上去是一个简单的循环, 其实是, 在旧的基础上新建新的执行队列, 所以从内存角度来说, 可以说并不是循环, 内存并没有被重新利用
, 只是已有的执行队列中新建了基本一样的执行队列.

**示例二:**

```javascript
const fibonacciSequence = (function() {
  const map = {}

  return (n) => {
    if (map[n] >= 1) {
      return map[n]
    }
    if (n === 1 || n === 2) {
      return 1
    }
    map[n] = fibonacciSequence(n - 2) + fibonacciSequence(n - 1)
    return map[n]
  }
})()
fibonacciSequence(50) // 12586269025
```

以上实例不会卡死, 因为只有第一次才是递归循环, 以后都是从第一次的循环中的结果 `map` 中读取了返回值而已

**示例三:**

```javascript
const fibonacciSequence = (n) => {
  let n1 = 1
  let n2 = 1
  let sum = 0
  for (let i = 2; i < n; i++) {
    sum = n1 + n2
    n1 = n2
    n2 = sum
  }
  return sum
}
fibonacciSequence(50) // 12586269025
```

只循环了一次

总结一下就是, 递归少用, 慎用, 容易出问题.

## 优缺点

通过以上对比可以看出

**优点:**

- 写法较简单, 易于理解
- 处理一些逻辑时, 比如"斐波拉契数列"实现简单

**缺点:**

- 递归太深, 容易造成栈移除, 直接卡死
- 消耗更多内存资源
- 难以调试 debug

## 尾递归优化

尾递归即, 在最后异步的执行过程中, 只调用了函数本身, 没有其它额外操作, 所有操作通过参数传递到下一步的函数中进行.

```javascript
// 尾递归
function fn() {
  return fn()
}

// 不属于尾递归, 因为最后异步除了递归之后, 还进行了+1这个操作
function fn1() {
  return fn() + 1
}
```

**举个阶乘例子:**

```javascript
// 普通阶乘
const factorial = (number) => {
  if (number <= 1) {
    return 1
  }
  return number * factorial(--number)
}
console.log(factorial(5)) // 120

// 尾递归优化阶乘
const factorialA = (number, total = 1) => {
  if (number <= 1) {
    return total
  }
  return factorialA(number - 1, total * number)
}
console.log(factorialA(5)) // 120
```

> PS: 尾递归优化的最大作用其实是 Javascript 引擎的工作, 本质上还是递归, 跟普通递归没什么不同, 只是 JS 引擎做了优化处理,
> 发现, 调用栈没有被其它子栈所引用的内存, 就移除了该调用栈而已, 在程序逻辑方面还是递归.
