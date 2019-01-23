const config = require('config')
const RPCClient = require('./grpc_modules/x-grpc').RPCClient
const InterceptingCall = require('./grpc_modules/x-grpc').grpc.InterceptingCall

async function init() {
  const rpc = new RPCClient(config.grpc)
  rpc.use(interceptor)
  await rpc.connect()
  console.info(`x-grpc客户端已连接远程服务【执行环境:${process.env.NODE_ENV},端口:${config.grpc.port}】`)
  await runInvoke(rpc)
}

async function runInvoke(rpc) {
  try {
    // 方法1
    // let params = { username: 'cheney', password: '123456' }
    // let meta = { nodetracing: 'testmeta' }
    // let result = await rpc.invoke('demo.User.login', params, meta)
    // console.info('登录信息')
    // console.info(result)
    // 方法2
    // params = { username: 'cheney' }
    // result = await rpc.invoke('demo.User.logout', params)
    // console.info('登出信息')
    // console.info(result)
    // 方法3
    params = { username: 'cheney', child: { extFiled: ['s1'], extProp: 's2' }, outside: { outFiled: ['o1'], outProp: 'o2' } }
    result = await rpc.invoke('advanced.Nest.test', params)
    console.info(result)
  } catch (err) {
    console.error(err)
  }
}

// 自定义拦截器
function interceptor(options, nextCall) {
  return new InterceptingCall(nextCall(options), {
    start: function (metadata, listener, next) {
      console.log(options.method_definition.path)
      metadata.add('timestamp', Date.now().toString())
      next(metadata, listener)
    }
  })
}

init()
