// 服务实现
module.exports = {
  login(call, cb) {
    console.log(`${Date.now()}${JSON.stringify(call.request)}`)
    cb(null, { res: `${call.request.username} 登录成功` })
  },
  logout(call, cb) {
    console.log(`${Date.now()}${JSON.stringify(call.request)}`)
    cb(null, { res: `${call.request.username} 退出成功`, code: '0' })
  }
}