/**
 * @author: Storm
 * @email: wenyejie@foxmail.com
 */

function Animal(name = 'animal') {
  this.name = name

  // 实例方法
  this.sleep = function() {
    console.log(`${this.name} 睡...`)
  }
}

// 原型方法
Animal.prototype.eat = function() {
  console.log(`${this.name} 吃...`)
}

// 静态方法
Animal.go = function() {
  console.log(`${this.name} 走...`)
}
