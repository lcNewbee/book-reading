const CreateDiv = function (html) {
  this.html = html
  this.init()
}

CreateDiv.prototype.init = function () {
  // const div = document.createElement('div')
  // div.innerHTML = this.html
  // document.body.append(div)
  console.log('create and append div')
}

const ProxySingleCreateDiv = (function() {
  var instance = null
  // 仍然是返回一个构造函数
  return function(html) {
    if (instance) return instance
    instance = new CreateDiv(html)
    return instance
  }
}())

/**
 * 将4-2中，创建并初始化和维持单一性的功能拆分出来，如果想创建普通的div，直接使用CreateDiv即可，
 * 如果想创建单一div，使用ProxySingleCreateDiv
 */

// test
const single1 = new ProxySingleCreateDiv('some text')
const single2 = new ProxySingleCreateDiv('some other text')
console.log(single1 === single2)