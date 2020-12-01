var strategies = {
  'S': function(salary) {
    return salary * 4
  },
  'A': function(salary) {
    return salary * 3
  },
  'B': function(salary) {
    return salary * 2
  }
}

// 也是将计算委托给策略对象
var calculateBonus = function (strategy, salary) {
  return strategies[strategy](salary)
}