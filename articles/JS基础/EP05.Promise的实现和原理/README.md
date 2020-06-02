# Promise 的实现和原理

`Promise` 是一个构造函数支持异步操作. 对于回调地狱有非常好的疗效.

详细资料请参考
[Promise - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

## `Promise`是一个构造函数

```javascript
class $Promise {
  constructor() {}
}

const instance = new $Promise()
console.log(instance)
```

## `Promise`的构造方法的参数中有个执行方法`(resolve, reject) => {}`

这个执行方法会被立即执行

```javascript
class $Promise {
  resolve() {}

  reject() {}
  constructor(executor) {
    executor(this.resolve, this.reject)
  }
}

const instance = new $Promise((resolve, reject) => {})
console.log(instance)
```

在实例的时候传入一个函数, 这个函数有两个参数`resolve`, `reject`都是函数, 这两个函数会在构造方法中传
入

## `Promise`的状态

一个 Promise 有以下几种状态:

- pending: 初始状态，既不是成功，也不是失败状态。
- fulfilled: 意味着操作成功完成。
- rejected: 意味着操作失败。

```javascript
class $Promise {
  #status = ''
  #resolve = () => {
    this.#status = 'fulfilled'
  }

  #reject = () => {
    this.#status = 'rejected'
  }
  constructor(executor) {
    this.#status = 'pending'
    executor(this.#resolve, this.#reject)
  }
}

const instance = new $Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
    console.log(instance) // #status = 'fulfilled'
  }, 1000)
})
console.log(instance) // #status = 'pending'
```

> 在 class 中名称前加上`#`号意味着内部私有属性/方法如: `#status`, 不可被外部访问, `Typescript`中则
> 以`private state`表示

当`Promise`被实例化之后即是`pending`状态当`resolve`被执行之后状态变更为`fulfilled`状态当`reject`被执
行之后状态变更为`rejected`状态

## `Promiss`会保存`resolve`,`reject`执行时中传入的值

```javascript
class $Promise {
  #status = ''
  #value
  #onfulfilled
  #onrejected
  #resolve = (value) => {
    if (this.#status !== 'pending') {
      return
    }
    this.#value = value
    this.#status = 'fulfilled'
    this.#onfulfilled(this.#value)
  }

  #reject = (value) => {
    if (this.#status !== 'pending') {
      return
    }
    this.#value = value
    this.#status = 'rejected'
    this.#onrejected(this.#value) // 这就是为什么没有reject会报错的原因.
  }
  constructor(executor) {
    this.#status = 'pending'
    executor(this.#resolve, this.#reject)
  }

  then(onfulfilled, onrejected) {
    this.#onfulfilled = onfulfilled
    this.#onrejected = onrejected
    // 当调用then方法之前状态流转已经结束, 则直接进行回调
    if (this.#status === 'fulfilled') {
      this.#onfulfilled(this.#value)
    } else if (this.#status === 'rejected') {
      this.#onrejected(this.#value)
    }
  }
}

const instance = new $Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('hello world!')
    console.log(instance) // #status = 'fulfilled'
  }, 1000)
})
console.log(instance) // #status = 'pending'

instance.then(
  (value) => {
    console.log('onfulfilled: ', value) // onfulfilled:  hello world!
  },
  (value) => {
    console.log('onrejected:', value)
  }
)
```

这里调用 then 方法的时候只是传两个参数方法到实例中. 只有当状态变更为`rejected`或`fulfilled`才会执行
这两个方法.

当调用 then 方法之前`Promise`的状态已经结束. 会马上回调`onfulfilled`和`onrejected`

当`status`为`fulfilled`或`rejected`意味着`Promise`流程已经结束, 状态不可变更. 所有只有状态
为`pending`时才能变更状态

![图一](./assets/promise-status.jpg)

## `fulfill`和`reject`值更新

> 当每次调用`then`方法之后, 如果`return`中的值有所变更则更新实例中的值, 如果传入的是`Promise`实例则
> 调用其中的值更新

```javascript
class $Promise {
  #status = ''
  #value
  #error
  #onfulfilled
  #onrejected
  #resolve = (value) => {
    if (this.#status !== 'pending') {
      return
    }
    this.#value = value
    this.#status = 'fulfilled'
    this.#handleFulfill()
  }

  #reject = (value) => {
    if (this.#status !== 'pending') {
      return
    }
    this.#error = value
    this.#status = 'rejected'
    this.#handleReject()
  }
  #parseInstance = (instance) => {
    // 我不知道V8引擎里面是怎么处理的, 但是我只能想到这个.
    instance.then(
      (value) => {
        this.#value = value
      },
      (error) => {
        this.#error = error
      }
    )
  }
  #handleFulfill = () => {
    if (!this.#onfulfilled) {
      return
    }
    const value = this.#onfulfilled(this.#value)
    if (value instanceof $Promise) {
      this.#parseInstance(value)
    } else if (value !== undefined) {
      this.#value = value
    }
  }

  #handleReject = () => {
    if (!this.#onrejected) {
      return
    }
    const error = this.#onrejected(this.#error) // 这就是为什么没有reject会报错的原因.
    if (error instanceof $Promise) {
      this.#parseInstance(error)
    } else if (error !== undefined) {
      this.#error = error
    }
  }

  then(onfulfilled, onrejected) {
    this.#onfulfilled = onfulfilled
    this.#onrejected = onrejected
    if (this.#status === 'fulfilled') {
      this.#handleFulfill()
    } else if (this.#status === 'rejected') {
      this.#handleReject()
    }
    return this
  }

  constructor(executor) {
    this.#status = 'pending'
    executor(this.#resolve, this.#reject)
  }
}

const instance = new $Promise((resolve, reject) => {
  resolve('hello world!')
})
console.log(instance) // #status = 'fulfilled'

instance
  .then(
    (value) => {
      console.log('onfulfilled: ', value) // hello world!
      return 100
    },
    (value) => {
      console.log('onrejected:', value)
    }
  )
  .then((value) => {
    console.log(value) // 100
  })
```

## 多个`then`, `finally`支持

> 因为`Promise`支持多个回调, 而且可以在回调队列中改变当前队列中的结果和状态

```javascript
class $Promise {
  #status = ''
  #value
  #error

  #callbackQueues = []
  #resolve = (value) => {
    if (this.#status !== 'pending') {
      return
    }
    this.#value = value
    this.#status = 'fulfilled'

    const then = this.#callbackQueues.find((item) => item.type === 'then')
    if (!!then) {
      this.#handleCallbackQueues()
    }
  }

  #reject = (error) => {
    if (this.#status !== 'pending') {
      return
    }
    this.#error = error
    this.#status = 'rejected'
    const then = this.#callbackQueues.find((item) => item.type === 'then')
    if (!!then) {
      this.#handleCallbackQueues()
    }
  }

  #parse = (instance, index) => {
    console.log(instance)
    let status
    instance
      .then(
        (value) => {
          this.#value = value
          status = 'fulfilled'
        },
        (error) => {
          this.#error = error
          status = 'rejected'
        }
      )
      .finally(() => {
        this.#handleCallbackQueues(++index, status)
      })
  }

  #handlethen = (cb, index, status) => {
    if (status === 'fulfilled') {
      this.#handledefault(
        {
          type: 'resolve',
          resolve: cb.resolve
        },
        index
      )
    } else if (status === 'rejected') {
      this.#handledefault(
        {
          type: 'reject',
          reject: cb.reject
        },
        index
      )
    }
  }

  #handledefault = (cb, index) => {
    let result = cb[cb.type]()

    if (result instanceof $Promise) {
      this.#parse(result, index)
      return
    }

    this.#value = result
    this.#handleCallbackQueues(++index, 'fulfilled')
  }

  #handleCallbackQueues = (index = 0, status = this.#status) => {
    if (index >= this.#callbackQueues.length) {
      return
    }
    const cb = this.#callbackQueues[index]

    if (cb.type !== 'then') {
      this.#handledefault(cb, index)
    } else {
      this.#handlethen(cb, index, status)
    }
  }

  then(resolve, reject) {
    this.#callbackQueues.push({
      type: 'then',
      resolve,
      reject
    })
    if (this.#status !== 'pending') {
      this.#handleCallbackQueues()
    }
    return this
  }

  finally(fn) {
    this.#callbackQueues.push({
      type: 'finally',
      finally: fn
    })
    return this
  }

  constructor(executor) {
    this.#status = 'pending'
    executor(this.#resolve, this.#reject)
  }
}
```

## 最后加上一些构造方法, 最终结果如下

```javascript
class $Promise {
  #status = ''
  #value
  #error

  #callbackQueues = []
  #resolve = (value) => {
    if (this.#status !== 'pending') {
      return
    }
    this.#value = value
    this.#status = 'fulfilled'

    const then = this.#callbackQueues.find((item) => item.type === 'then')
    if (!!then) {
      this.#handleCallbackQueues()
    }
  }

  #reject = (error) => {
    if (this.#status !== 'pending') {
      return
    }
    this.#error = error
    this.#status = 'rejected'
    const then = this.#callbackQueues.find((item) => item.type === 'then')
    if (!!then) {
      this.#handleCallbackQueues()
    }
  }

  #parse = (instance, index) => {
    console.log(instance)
    let status
    instance
      .then(
        (value) => {
          this.#value = value
          status = 'fulfilled'
        },
        (error) => {
          this.#error = error
          status = 'rejected'
        }
      )
      .finally(() => {
        this.#handleCallbackQueues(++index, status)
      })
  }

  #handlethen = (cb, index, status) => {
    if (status === 'fulfilled') {
      this.#handledefault(
        {
          type: 'resolve',
          resolve: cb.resolve
        },
        index
      )
    } else if (status === 'rejected') {
      this.#handledefault(
        {
          type: 'reject',
          reject: cb.reject
        },
        index
      )
    }
  }

  #handledefault = (cb, index) => {
    let result = cb[cb.type]()

    if (result instanceof $Promise) {
      this.#parse(result, index)
      return
    }

    this.#value = result
    this.#handleCallbackQueues(++index, 'fulfilled')
  }

  #handleCallbackQueues = (index = 0, status = this.#status) => {
    if (index >= this.#callbackQueues.length) {
      return
    }
    const cb = this.#callbackQueues[index]

    if (cb.type !== 'then') {
      this.#handledefault(cb, index)
    } else {
      this.#handlethen(cb, index, status)
    }
  }

  then(resolve, reject) {
    this.#callbackQueues.push({
      type: 'then',
      resolve,
      reject
    })
    if (this.#status !== 'pending') {
      this.#handleCallbackQueues()
    }
    return this
  }

  finally(fn) {
    this.#callbackQueues.push({
      type: 'finally',
      finally: fn
    })
    return this
  }

  // 这里暂时没有想好怎么处理先注释掉好了
  // catch(fn) {
  //   this.#callbackQueues.push({
  //     type: 'catch',
  //     catch: fn
  //   })
  //   return this
  // }

  constructor(executor) {
    this.#status = 'pending'
    executor(this.#resolve, this.#reject)
  }

  static resolve(value) {
    return new $Promise((resolve) => {
      resolve(value)
    })
  }

  static reject(error) {
    return new $Promise((resolve, reject) => {
      reject(error)
    })
  }

  static all(queue) {
    return new $Promise((resolve, reject) => {
      const values = []
      let resolveLength = 0
      for (let i = 0; i < queue.length; i++) {
        queue[i].then(
          (value) => {
            values[i] = value
            resolveLength++
            if (resolveLength === queue.length) {
              resolve(values)
            }
          },
          (error) => {
            reject(error)
            break
          }
        )
      }
    })
  }
}
```

## 总结

- `Promise`是一个构造函数
- `Promise`的状态是一个不可逆, 不可变的
- `Promise`有一个异步回调队列, 回调队列中可以改变回调结果和状态, 但不会改变实例的结果

## 参考文档

- [Promise - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
