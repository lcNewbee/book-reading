var S = function(salary) {
  return salary * 4
}
var A = function(salary) {
  return salary * 3
}
var B = function(salary) {
  return salary * 2
}

var calcBouns = function(strategy, salary) {
  return strategy(salary)
}

calcBouns(S, 40000)

// 策略不再放在一个对象里，而是直接以函数的形式出现，在js中，函数是可以到处传递的