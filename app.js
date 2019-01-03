const config = require('config')
const RPCServer = require('./grpc_modules/x-grpc').RPCServer

const server = new RPCServer(config.grpc)
server.use(middlewareFunc)
server.listen()
console.info(`x-grpc服务启动【执行环境:${process.env.NODE_ENV},端口:${config.grpc.port}】`)

async function middlewareFunc(ctx, next) {
    console.log(ctx.call.metadata)
    await next()
    console.log(ctx.call.metadata)
}
