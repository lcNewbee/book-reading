var getSingle = function(fn) {
  var result = null
  return function () {
    return result || (result = fn.apply(this, arguments))
  }
}

var createLoginLayer = function () {
  const div = document.createElement('div')
  div.innerHTML = '我是登录浮窗'
  div.style.display = 'none'
  document.body.append(div)
  return div
}

var createSingleLoginLayer = getSingle(createLoginLayer)

document.getElementById('loginBtn').onclick = function() {
  const loginLayer = createSingleLoginLayer()
  loginLayer.style.display = 'block'
}