/**
 * 4-1 虽然完成了一个单例模式，但是使用方法上和普通类有很大的区别，
 * 用户必须知道这是一个单例模式的类，并且使用getInstance进行实例化
 * 也就是说，这个单例模式对用户不是透明的，所以下面的目的就是创建一个对用户透明,
 * 使用方法和普通类一致的单例模式
 */

const SingleDiv = (function() {
  var instance = null
  const SingleDiv = function(html) {
    if (instance) return instance // 构造函数返回对象类型，则该对象会被当做实例对象
    this.html = html
    this.init()
    return instance = this
  }

  SingleDiv.prototype.init = function() {
    // const div = document.createElement('div')
    // div.innerHTML = this.html
    // document.body.append(div)
    console.log('create and append div')
  }

  return SingleDiv
})()

/**
 * 这个自执行函数封装的不再只是一个方法，而是整个构造函数，利用了构造函数也可以自定义返回值的性质，
 * 返回了之前缓存实例对象（如果存在）
 * 
 * 这个自执行函数做了两件事情，1. 创建div并初始化；2. 维持单一性
 * 假设要在页面创建很多div，那么这个构造函数将无法完成（虽然其中包含了创建div的逻辑，
 * 但是由于耦合，这个类无法完成这样的工作），所以违反了“单一职责原则”
 */

// test
const div1 = new SingleDiv('some text')
const div2 = new SingleDiv('some other text')

console.log(div1 === div2) // true