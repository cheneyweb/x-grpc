// 服务实现
module.exports = {
  // 嵌套消息
  test(call, cb) {
    console.log(call.request)
    cb(null, { res: 'Y' })
  }
}