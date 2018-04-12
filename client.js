const config = require('config')
const RPCClient = require('./grpc_modules/x-grpc').RPCClient

async function init() {
  const rpc = new RPCClient(config.grpc)
  await rpc.connect()
  console.info(`x-grpc客户端已连接远程服务【执行环境:${process.env.NODE_ENV},端口:${config.grpc.port}】`)

  await runInvoke(rpc)
}

async function runInvoke(rpc) {
  try {
    // 方法1
    let params = { username: 'cheney', password: '123456' }
    let result = await rpc.invoke('user.login', params)
    console.info('登录信息')
    console.info(result)
    // 方法2
    params = { username: 'cheney' }
    result = await rpc.invoke('user.logout', params)
    console.info('登出信息')
    console.info(result)
  } catch (err) {
    console.error(err)
  }
}

init()
