const RPCClient = require('x-grpc').RPCClient

// 服务实现
module.exports = {
  // 单服务
  login(call, cb) {
    console.log(`${Date.now()}${JSON.stringify(call.request)}`)
    // console.log(call.metadata.get('nodetracing')[0])
    // console.log(call.metadata.get('timestamp')[0])
    cb(null, { res: `${call.request.username} 登录成功` })
  },
  // 多服务
  async logout(call, cb) {
    console.log(`${Date.now()}${JSON.stringify(call.request)}`)

    // 先调用服务2的登录
    const rpc2 = await new RPCClient({
      "port": 50051,
      "protosDir": "/src/protos/",
      "implsDir": "/src/impls/",
      "serverAddress": "x-grpc2"
    }).connect()
    params = { username: 'cheney' }
    result = await rpc2.invoke('demo.User.login', params)
    console.info('服务2已执行，可以后续执行本服务操作')
    console.info(result)

    cb(null, { res: `${call.request.username} 退出成功`, code: '0' })
  }
}