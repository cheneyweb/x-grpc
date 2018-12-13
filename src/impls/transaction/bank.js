// 服务实现
module.exports = {
  transfer(call, cb) {
    console.log(`${Date.now()}${JSON.stringify(call.request)}`)
    cb(null, { res: `Y` })
  }
}