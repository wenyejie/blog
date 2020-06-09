# 判断两个值是否相等

```javascript
const compare = (a, b) => {
  console.log(`${a} == ${b} =>`, a == b)
  console.log(`${a} === ${b} =>`, a === b)
  console.log(`Object.is(${a}, ${b}) =>`, Object.is(a, b))
}
```

以上三个方法都是用来判断两个数据是否等同, 有时候确会返回不一样的结果, 如下:

```javascript
compare(1, '1')

// 1 == '1' => true
// 1 === '1' => false
// Object.is(1, '1') => false
```

## 简述

`==` 两个等于号, **等于**运算符, 也叫**非严格相等比较**, 又名**宽松相等比较**

`===` 三个等于号, **恒等于**运算符, 也叫**严格相等比较**

`Object.is` Object 的原型方法, ES6 的新特性, 详见:
[Object.is() - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)

PS: 关于 `==`和`===`有很多称呼, 能理解就行, 因为一般就直接称呼为两/三个等于号, 就是这么粗暴

## 关于`==`的类型转换

等于运算符在判断左右两个值是否相等时. 它有一个附加的功能, 就是数据类型转换.

这也是它的优点, 也是它的缺点.

优点就是, 不用进行手动的类型转换, 引擎已经帮我们处理了,

缺点就是, 很容易造成混淆和逻辑混乱.

Webstorm 在你使用`==`的时候会提示:

> Comparison a == b may cause unexpected type coercion(比较 a==b 可能会导致意料之外的类型转换)

为什么会提示这个. 因为这个`==`运算符会让大家有很多问号, 举个例子:

```javascript
const obj = {
  valueOf() {
    return 1
  },
  toString() {
    return '哗啦啦, 我是撒币'
  }
}

console.log(obj == 1) // true
```

这个真是让人头大, 让人有很多小朋友.

这是`==`的附带规则, 当比较双方一个是对象, 一个是数字或者字符串时, 引擎会吧对象转换成基础类型的数据在对两者进行比较. 而对
象转换成基础数据类型的方法, 就是执行对象的`valueOf`或者`toString`方法(当没有`valueOf`的时候会执行`toString`,
`toString`是备胎) 详细如下:

```javascript
// 示例1:
const obj = {
  valueOf() {
    console.log('valueOf: 1')
    return 1
  },
  toString() {
    console.log('toString: 哗啦啦, 我是撒币')
    return '哗啦啦, 我是撒币'
  }
}
console.log(obj == 1)
// valueOf: 1
// true

delete obj.valueOf
console.log(obj == 1)
// toString: 哗啦啦, 我是撒币
// false

// 示例2:

const strA = new String('str')
const strB = new String('str')

strA == strB // true
strA === strB // false

// 原因是因为它们都是对象
```

类型转换规则如下:

当比较运算涉及类型转换时 (i.e., non–strict comparison), JavaScript 会按以下规则对字符串，数字，布尔或对象类型的操作数进
行操作:

- 当比较数字和字符串时，字符串会转换成数字值。 JavaScript 尝试将数字字面量转换为数字类型的值。 首先, 一个数学上的值会从
  数字字面量中衍生出来，然后这个值将被转为一个最接近的 Number 类型的值。
- 如果其中一个操作数为布尔类型，那么布尔操作数如果为 true，那么会转换为 1，如果为 false，会转换为整数 0，即 0。
- 如果一个对象与数字或字符串相比较，JavaScript 会尝试返回对象的默认值。操作符会尝试通过方法 valueOf 和 toString 将对象转
  换为其原始值（一个字符串或数字类型的值）。如果尝试转换失败，会产生一个运行时错误。
- 注意：当且仅当与原始值比较时，对象会被转换为原始值。当两个操作数均为对象时，它们作为对象进行比较，仅当它们引用相同对象
  时返回 true。

详见:
[使用比较操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#%E4%BD%BF%E7%94%A8%E6%AF%94%E8%BE%83%E6%93%8D%E4%BD%9C%E7%AC%A6)

## 关于`===`

恒等于运算符, 不会对左右两边的比较值进行类型转换, 类型不同必定不会相等

- 类型不同, 必定不相等
- 如果是`Number`类型 `NaN === NaN // false`, `NaN` 不等于`NaN`, 就大概跟问: "不是人"等不等于"不是人"一样

```javascript
// NaN == NaN => false
// NaN === NaN => false
// Object.is(NaN, NaN) => true
```

- `null === null`
- `undefined === undefined`

## 总结

`==`会进行类型转换, 最终会把两边的值转换成同一个类型进行比较. 还可能产生副作用.

`===`会进行类型判断, 和值判断, 不过`NaN !== NaN` 这点要注意

`Object.is` 大多数时候跟`===`一样, 除了 `NaN`等于`NaN`
