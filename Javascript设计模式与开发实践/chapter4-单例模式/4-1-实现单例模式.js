const Singleton = function(name) {
  this.name = name
  this.instance = null
}

Singleton.prototype.getName = function() {
  return this.name
}

// 注意这里，不是原型方法，而是类的静态方法，Singleton是构造函数
// 但是实例化确不是交给用户完成，而是通过静态方法完成的
Singleton.getInstance = function(name) {
  if (this.instance) return this.instance
  this.instance = new Singleton(name)
  return this.instance
}

/****************或者*****************/

const Singleton2 = function(name) {
  this.name = name
}

Singleton2.prototype.getName = function() {
  return this.name
}

Singleton2.getInstance = (function() {
  let instance = null
  return function(name) {
    if (!instance) instance = new Singleton2(name)
    return instance
  }
})()


/**
 * 注意一下两种方法获取实例的方式：都用了*类静态方法*的形式返回实例对象，而不是直接通过new的方式获取实例
 * 
 * 作者评论：该方式意义不大，仅为理解使用
 */

// test
const a = Singleton.getInstance('carpe')
const aa = Singleton.getInstance('diem') // 一旦实例化，就无法再次实例化，且实例保持不变
console.log(a === aa) // true

const b = Singleton2.getInstance('carpe')
const bb = Singleton2.getInstance('diem')
console.log(b === bb) // true