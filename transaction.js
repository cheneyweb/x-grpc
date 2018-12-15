const RPCClient = require('x-grpc').RPCClient
// const RPCClient = require('./grpc_modules/x-grpc').RPCClient

async function main() {
  const rpc1 = await new RPCClient({
    "port": 50051,
    "protosDir": "/src/protos/",
    "implsDir": "/src/impls/",
    "serverAddress": "ext.na77.org"
  }).connect()
  const rpc2 = await new RPCClient({
    "port": 50051,
    "protosDir": "/src/protos/",
    "implsDir": "/src/impls/",
    "serverAddress": "localhost"
  }).connect()
  await transaction(rpc1,rpc2)
}

// 事务函数
async function transaction(rpc1,rpc2) {
  try {
    // 方法1
    let params = { username: 'cheney', password: '123456' }
    let result = await rpc1.invoke('demo.User.login', params)
    console.info('先登录')
    console.info(result)
    // 方法2
    params = { username: 'cheney' }
    result = await rpc2.invoke('demo.User.logout', params)
    console.info('后登出')
    console.info(result)
  } catch (err) {
    console.error(err)
  }
}

main()
