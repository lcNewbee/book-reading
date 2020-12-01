// 最初的问题

var calculateBonus = function (performanceLevel, salary) {
  if (performanceLevel === 'S') {
    return salary * 4
  }

  if (performanceLevel === 'A') {
    return salary * 3
  }

  if (performanceLevel === 'B') {
    return salary * 2
  }
}

calculateBonus('S', 40000) // 计算奖金
calculateBonus('B', 20000)

/**
 * 上面代码的缺陷：
 * 1. if...else...分支逻辑太多
 * 2. 扩展性不强，如果要增加绩效类型，就必须改动函数本身，违反开闭原则（对扩展开放，对修改关闭）
 * 3. 复用性不强，如果其他地方需要使用奖金计算算法，就必须重复实现分支里面的逻辑
 */

/*********************************************************************************************/
// 第一次重构：使用组合函数重构代码

const performanceS = function(salary) {
  return salary * 4
}
const performanceA = function(salary) {
  return salary * 3
}
const performanceB = function(salary) {
  return salary * 2
}

const calculateBonus = function(performanceLevel, salary) {
  if (performanceLevel === 'S') {
    return performanceS(salary)
  }

  if (performanceLevel === 'A') {
    return performanceA(salary)
  }

  if (performanceLevel === 'B') {
    return performanceB(salary)
  }
}

calculateBonus('S', 40000) // 计算奖金
calculateBonus('B', 20000)

/**
 * 本次重构决了策略复用的问题，以及策略修改时不需要动奖金计算的逻辑，
 * 但是在新增策略时，依然需要修改奖金计算的逻辑，随着时间推移，函数也可能变得庞大起来，还是违反开闭原则
 */

/*********************************************************************************************/
// 第二次重构：策略模式重构

var performanceS = function() {}
performanceS.prototype.calculate = function(salary) {
  return salary * 4
}
var performanceA = function() {}
performanceS.prototype.calculate = function(salary) {
  return salary * 3
}
var performanceB = function() {}
performanceS.prototype.calculate = function(salary) {
  return salary * 2
}

var Bonus = function () {
  this.salary = null
  this.strategy = null
}
// 为什么salary和strategy不直接传给构造函数，在初始化时就设置好？
// 自问自答：如果在初始化就设置好，如果需要计算多个奖金，那就必须初始化多个对象
// 但如果两者都可以通过方法修改，则不论计算多少奖金，都只需要初始化一个对象，然后灵活修改
Bonus.prototype.setSalary = function (salary) {
  this.salary = salary
}
Bonus.prototype.setStrategy = function (strategy) {
  this.strategy = strategy
}
// Bonus将最后的计算委托给策略类执行
Bonus.prototype.getBonus = function() {
  this.strategy.calculate(this.salary)
}

var bonus = new Bonus()
bonus.setSalary(40000)
bonus.setStrategy(new performanceS())
bonus.getBonus()

bonus.setSalary(20000)
bonus.setStrategy(new performanceB())
bonus.getBonus()


// 上面是面向对象语言的策略模式实现方式，下面讲JS的实现方式