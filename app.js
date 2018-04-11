const config = require('config')
const RPCServer = require('./grpc_modules/x-grpc').RPCServer

new RPCServer(config.grpc.port).load(`${__dirname}${config.grpc.protosDir}`, `${__dirname}${config.grpc.implDir}`)

console.info(`x-grpc服务启动【执行环境:${process.env.NODE_ENV},端口:${config.grpc.port}】`)
