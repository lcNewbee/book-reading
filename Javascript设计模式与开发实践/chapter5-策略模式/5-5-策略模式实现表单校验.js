var strategies = {
  isNonEmpty: function(value, errorMsg) {
    if (value === '') {
      return errorMsg
    }
  },
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg
    }
  },
  isMobile: function(value, errorMsg) {
    if (!/^1[3|5|8][0-9]{9}$/.test(value)) {
      return errorMsg
    }
  }
}

var Validator = function() {
  this.cache = []
}

Validator.prototype.add = function(dom, rule, errorMsg) {
  var ary = rule.split(':')
  this.cache.push(function() {
    var strategy = ary[0]
    var value = dom.value
    return strategies[strategy].call(dom, value, strategy, errorMsg)
  })
}

Validator.prototype.start = function() {
  const len = this.cache.length
  for (var i = 0; i < len; i++) {
    const msg = this.cache[i].call()
    if (msg) return msg
  }
}

// 使用方式
var registerForm = document.getElementById('registerForm')

const validateFun = function () {
  const validator = new Validator()
  // registerForm为form元素id，userName等为input元素name属性
  validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空')
  validator.add(registerForm.password, 'minLength:8', '密码不能少于8位')
  validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确')
  var msg = validator.start()
  return msg
}

registerForm.onsubmit = function() {
  const msg = validateFun()
  if (msg) {
    console.log(msg)
    // 阻止提交逻辑
    return false
  }
}