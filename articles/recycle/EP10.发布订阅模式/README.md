# 发布订阅模式

定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。

## 简述

在发布订阅模式中, 有两个主体, 一个`发布者publish`, 一个`订阅者subscribe`.

主要操作有三个:

- 订阅者订阅消息
- 发布者发布消息
- 订阅者收到消息

## 举个简单的例子

Javascript 中的事件, 比如点击事件

```html
<button type="button">button</button>

<script>
  // 发布者
  const publish = document.querySelector('button')

  // 订阅者
  const subscribe = (event) => {
    console.log('click', event)
  }

  // 订阅操作
  publish.addEventListener('click', subscribe)

  // 发布操作
  publish.click()
</script>
```

从这里大概可以看出,

订阅者可以订阅多个消息除了`click`还可以订阅`dbclick`, 还可以从其它发布者那里订阅消息.

发布者也可以发布多个消息, 多种不同的消息.

但对于订阅者和发布者而言, 它只关心, 与自己有关的消息, 其它消息一概不理.

这是一个`多对多`的关系

## 举个复杂的例子

订阅者在博客平台订阅了文章, 发布者发布了文章, 订阅者收到发布者发布的文章

这里有三个角色 `博客平台`, `订阅者`, `发布者`

```javascript
// 博客
class Blog {
  // 订阅者
  #subscribers = []

  constructor(name) {
    this.name = name
  }

  // 订阅
  subscribe(listener) {
    this.#subscribers.push(listener)
  }

  // 发布
  publish(article) {
    this.#subscribers.forEach((subscriber) => {
      subscriber(article)
    })
  }
}

const blog = new Blog('博客')

// 订阅者订阅了名为前端分类
blog.subscribe((article) => {
  console.log('收到消息', article)
})

// 发布者发布了文章
blog.publish({
  title: '发布订阅模式',
  content: '......'
})
```

[codepen 实例](https://codepen.io/wenyejie/pen/BajBbpN)

## 真实的例子

```javascript
// 对真实的代码中, 就是这么简单, 因为毕竟是单例模式啊!
const userInfo = {
  // 用户信息数据
  data: {
    id: '',
    portrait: '',
    nickname: ''
  },

  // 订阅着集合
  listeners: [],

  // 更新用户数据
  update(data) {
    this.data = Object.assign(this.data, data)
    this.trigger()
  },

  // 订阅
  subscribe(listener) {
    this.listeners.push(listener)
    // 不管订阅前的信息, 还是订阅后的信息, 都需要推送给订阅者
    if (this.data.id) {
      this.trigger(listener)
    }
  },

  // 下发
  trigger(listener) {
    if (listener) {
      listener(this.data)
      return
    }

    this.listeners.forEach((listener) => {
      listener(this.data)
    })
  }
}

// 初始化应用后, 获取到用户信息

// fetch('./getUserInfo', (response) => {
//   userInfo.update(response)
// })

// 顶部栏订阅用户信息, 用以展示用户昵称
userInfo.subscribe((user) => {
  console.log('顶部栏', user.nickname)
})

userInfo.update({
  id: '001',
  nickname: '奥特曼',
  portrait: 'http://img.la/100x100?s=demo'
})

// 侧边栏订阅用户信息, 用以展示头像
userInfo.subscribe((user) => {
  console.log('侧边栏', user.portrait)
})
```

[codepen 实例](https://blog.codepen.io/documentation/editor-view/)

## 观察者模式

在第一个示例中, 订阅者和发布者是互相知道对方的

在第二个实例中, 订阅者和发布者是互相不知道的, 通过第三方进行中转

`订阅发布模式`, `观察者模式` 这两者的区别就是, 两者之间知不知道对方的存在.

第一个示例, 互相知道对方, 叫观察者模式, 一对多. 发布者只有一个

第二个实例, 互相不知道对方, 叫做订阅发布, 多对多. 发布者可以订阅者都可以有多个.
