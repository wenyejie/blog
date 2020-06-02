# Javascript 继承

> **继承**是面向对象软件技术当中的一个概念，与多态、封装共为面向对象的三个基本特征。继承可以使得子类
> 具有父类的属性和方法或者重新定义、追加属性和方法等。 ---
> [继承（面向对象的继承）\_百度百科](https://baike.baidu.com/item/%E7%BB%A7%E6%89%BF/20267560?fr=aladdin)

## 简述

在`Javascript`中继承就是一个对象继承另外一个对象的属性和方法, 与其它语言不同的是, JS 并不是通过类来
继承, 而是通过`原型链`来继承.

PS: ES6 中的`class`关键字只是语法糖, 本质还是`原型链`.

PS: 关于`原型和原型链`请参考本系列文章

可以说`Javascript`就是一门基于原型链的语言.

在我们常见的数据结构中 字符串继承于`function String ()` 数组继承与 `function Array ()`. 这些对象都是
继承于相对应的构造函数.

## 常见的继承方式

除了上述的`原型链继承`以外还有几种继承方式.

- 原型继承
- 构造继承
- 实例继承
- 拷贝继承
- 寄生继承
- 组合继承(原型继承+构造继承)
- 寄生组合继承(寄生继承+组合继承)

## 原型继承

这是最常见的继承方式, JS 中自带的继承关系, 绝大多数都是基于`原型继承`之上的

```javascript
function Demo() {}

Demo.prototype.name = 'demo'
Demo.prototype.sayHi = function() {
  console.log('Hi!')
}

const instance = new Demo() // {}

instance.name // demo
instance.sayHi() // Hi!
```

实例化后可以看出, `instance`本身并没有任何属性和方法, 但是它可以调用`name`和`sayHi`.

就是因为`instance`继承了父类的原型对象`Demo.prototype`, 有个`__proto__`指向了`Demo.prototype`, 标明
了继承关系,

`instance`继承自`Demo.prototype`

`instance`可以一直往上追溯到`Object.prototype`和`null`, 并继承这两者

**优点**:

- 简单好理解, 最常用

**缺点**:

- 无法实现多继承; 即`__proto__`指向是单向的, 不能同时指向多个原型对象
- 无法向父类传参; 这点主要体现在子类继承父类时, 无法传参, 如下

```javascript
function Parent(name) {
  this.name = name
}
function Child(age) {
  this.age = age
}

Child.prototype = new Parent()

const instance = new Child() // 这里不能给父类`Parent`传参name
```

- 原型方法和原型属性被所有实例共享, 很容易被玩坏
- 当原型链过长时, 调用不存在或者在顶层的方法或属性时, 比较耗时; 因为要一层层往上查找 `instance`你有
  sayHi 方法吗? -> `Child.prototype`你有 sayHi 方法吗? -> `Parent.prototype`你有 sayHi 方法吗?
  **......** 直到找到或者到最底层`null`终止

## 构造继承

通过执行父类构造函数来继承父类的属性和方法, 跟原型无关

```javascript
function Parent(name) {
  this.name = name
}
function Child(age) {
  Parent.call(this)
  this.age = age
}

const instance = new Child()
```

在实例化`Child`的构造方法里面执行`Parent`方法, 使实例`instance`继承父类`Parent`的实例方法/属性

**优点**:

- 可以实现多继承

```javascript
function Child() {
  Parent.call(this)
  ParentA.call(this)
  ParentB.call(this)
}
```

- 可以传参

```javascript
function Child() {
  Parent.call(this, 'child')
}
```

**缺点**:

- 无法继承父类的原型方法和属性; 因为只是执行了方法没有改变`__proto__`的指向
- 实例不是父类的实例; `instance instanceof Parent === false`
- 无法复用; 即所有继承父类的都是实例方法和实例属性, 都是新生成的. 不能共用方法和属性. 类似于工厂模式

```javascript
function Parent(name) {
  this.name = name
  this.callMyName = function() {}
}
function Child(age) {
  Parent.call(this)
  this.age = age
}

const instance = new Child()
const instanceA = new Child()

instance.callMyName !== instanceA.callMyName
```

## 实例继承

在子类中对父类进行实例化, 并返回当前实例

```javascript
function Parent(name) {
  this.name = name
}
function Child(name, age) {
  const instance = new Parent(name)
  instance.age = age
  return instance
}

const instance = new Child()
console.log(instance instanceof Parent) // true
console.log(instance instanceof Child) // false
```

实际上实例只是父类的实例, 子类只是在父类实例的基础上进行加减

**优点**:

- 实现简单
- 可以给父类传参
- 可以复用父类的原型方法/属性

**缺点**:

- 子类没有自己的原型
- 实例是父类的实例, 而不是子类的实例

## 拷贝继承

顾名思义, 就是把父类的属性和方法拷贝一份, 给予实例

```javascript
function Parent(name) {
  this.name = name
}
function Child(name, age) {
  const instance = new Parent(name)
  for (let key in instance) {
    this[key] = instance[key]
  }
  this.age = age
}

// ;(function() {
//   for (let key in Parent.prototype) {
//     Child.prototype[key] = Parent.prototype[key]
//   }
// })()

const instance = new Child('child', 20)
console.log(instance instanceof Parent) // false
console.log(instance instanceof Child) // true
```

实例属于子类, 不属于父类, 而且不能实时继承父类

**优点**:

- 可以实现多继承
- 可以给父类传参
-

**缺点**:

- 不能动态继承父类
- 效率较低, 内存占用高

## 寄生继承

通过把父类的原型对象寄生在第三方类中实现继承, 寄生的意义就是拓展子类的时候, 不会影响到父类

```javascript
function Parent(name = 'parent') {
  this.name = name
}
Parent.prototype.callMyName = function() {}
function Child(age) {
  this.age = age
}
Child.prototype.getMyName = function() {}
;(function() {
  function Super() {}
  Super.prototype = Parent.prototype
  Child.prototype = new Super()
  Child.prototype.constructor = Child
})()

const instance = new Child(20)
console.log(instance instanceof Parent) // true
console.log(instance instanceof Child) // true
```

**优点**:

- 实例即是子类的实例, 也是父类的实例

**缺点**:

- 实现复杂
- 无法继承子类的原型方法/属性
- 无法给父类传参
- 无法继承父类的实例方法/属性

## 组合继承

组合继承即: 是把原型继承和构造继承组合起来使用.

```javascript
function Parent(name = 'parent') {
  this.name = name
}
Parent.prototype.callMyName = function() {}
function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}
Child.prototype = new Parent()
Child.prototype.constructor = Child
Child.prototype.getMyName = function() {}

const instance = new Child('instance', 20)

console.log(instance)
```

优点:

- 实例即是子类的实例, 也是父类的实例
- 可以继承父类的[实例|原型]的[属性|方法]
- 可以传参
- 函数可以复用

缺点:

- 调用了两次父类的构造函数, 生成了两份实例
- 实现复杂

## 寄生组合继承

结合寄生继承和组合继承两者的优点

```javascript
function Parent(name = 'parent') {
  this.name = name
}
Parent.prototype.callMyName = function() {}
function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

;(function() {
  function Super() {}
  Super.prototype = Parent.prototype
  Child.prototype = new Super()
  Child.prototype.constructor = Child
})()
Child.prototype.getMyName = function() {}

const instance = new Child('instance', 20)
console.log(instance)
```

优点:

- 实例即是子类的实例, 也是父类的实例
- 可以继承父类的[实例|原型]的[属性|方法]
- 可以传参
- 函数可以复用

缺点

- 实现上较复杂

## `class`

`class` 本质就是`语法糖`, 是`寄生组合继承`的`语法糖`

> 语法糖往往给程序员提供了更实用的编码方式，有益于更好的编码风格，更易读。不过其并没有给语言添加什么
> 新东西。简单来说语法糖是便捷的写法

## 参考文档

- [MDN web docs](https://developer.mozilla.org/)
