// 类似于4-1的getInstance，只有在需要单例的时候才会调用构造函数实例化，而不是一进入页面就实例化
// 这样的特性称为“惰性”

Singleton.getInstance = function(name) {
  if (this.instance) return this.instance
  this.instance = new Singleton(name)
  return this.instance
}

// 登录弹窗
// version 1
var loginLayer = (function () {
  const div = document.createElement('div')
  div.innerHTML = '我是登录浮窗'
  div.style.display = 'none'
  document.body.append(div)
  return div
})()

document.getElementById('loginBtn').onClick = function() {
  loginLayer.style.display = 'block'
}

// 上面的问题在于，一进入页面就创建了浮窗，但实际上用户可能不登录，也就不需要创建

// version 2
var createLoginLayer = (function() {
  var div = null
  return function() {
    if (instance) return div
    div = document.createElement('div')
    div.innerHTML = '我是登录浮窗'
    div.style.display = 'none'
    document.body.append(div)
    return div
  }
})()

document.getElementById('loginBtn').onClick = function() {
  var loginLayer = createLoginLayer()
  loginLayer.style.display = 'block'
}

// 上面的例子虽然完成了惰性创建，但是又违反了单一职责原则，createLoginLayer有两个职责，1. 创建浮窗； 2. 维护单一性
// 再优化看4-6