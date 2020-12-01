// 策略对象
const tween = {
  linear: function (t, b, c, d) {
    return t * c / d + b
  },
  easeIn: function (t, b, c, d) {
    return c * (t /= d) * t + b
  }
  // 省略其他策略
}

const Animate = function (dom) {
  this.dom = dom
  this.startPos = 0
  this.startTime = 0
  this.endPos = 0
  this.propertyName = null
  this.duration = 0
  this.easing = null // 策略
}

Animate.prototype.start = function(propertyName, endPos, duration, easing) {
  this.propertyName = propertyName
  this.endPos = endPos
  this.duration = duration
  this.easing = tween[easing]
  this.startTime = +new Date()
  this.startPos = this.dom.getBoundingClientRect()[propertyName]

  var self = this
  var timeId = setInterval(function() {
    if (self.step() === false) {
      clearInterval(timeId)
    }
  }, 19)
}

Animate.prototype.step = function () {
  // 传入时间等参数计算当前位置，更新css属性
  var t = +new Date()
  if (t > this.startTime + this.duration) { // 超时，直接更新位置到终点
    this.update(this.endPos)
    return false
  }

  var pos = this.easing(t - this.startTime, this.startPos, this.endPos - this.startPos, this.duration)
  this.update(pos)
}

Animate.prototype.update = function() {
  this.dom.style[this.propertyName] = pos + 'px'
}

// 使用
var div = document.getElementById('div')
var animate = new Animate(div)
animate.start('left', 1000, 2000, 'easeIn')