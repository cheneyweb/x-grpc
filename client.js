const config = require('config')
const RPCClient = require('./grpc_modules/x-grpc').RPCClient

async function init() {
  const rpc = new RPCClient(config.grpc.port, config.grpc.serverAddress)
  await rpc.load(`${__dirname}${config.grpc.protosDir}`)
  console.info(`x-grpc客户端已连接远程服务【执行环境:${process.env.NODE_ENV},端口:${config.grpc.port}】`)

  await runInvoke(rpc)
}

async function runInvoke(rpc) {
  try {
    let params = { username: 'cheney' }
    const result = await rpc.invoke('user.login', params)
    console.info(result)
  } catch (err) {
    console.error(err)
  }
}

init()
