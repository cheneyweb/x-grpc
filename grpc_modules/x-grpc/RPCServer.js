const protoLoader = require('@grpc/proto-loader')
const grpc = require('grpc')
const fs = require('fs').promises
const path = require('path')
class RPCServer {
    constructor(grpcConfig) {
        this.ip = grpcConfig.ip || '0.0.0.0'
        this.port = grpcConfig.port
        this.protoDir = `${__dirname}/../..${grpcConfig.protosDir}`
        this.implDir = `${__dirname}/../..${grpcConfig.implsDir}`
        this.loaderOptions = grpcConfig.loaderOptions
        this.serviceMap = {}
        this.functionMap = {}
    }
    // 自动加载proto和js
    run() {
        const p0 = fs.readdir(this.protoDir)
        const p1 = fs.readdir(this.implDir)
        Promise.all([p0, p1]).then(res => {
            for (let file of res[0]) {
                const filePart = path.parse(file)
                const packageName = filePart.name
                const serviceName = filePart.name.charAt(0).toUpperCase() + filePart.name.slice(1)
                const filePath = path.join(this.protoDir, file)
                if (filePart.ext == '.proto') {
                    const packageDefinition = protoLoader.loadSync(filePath, this.loaderOptions)
                    this.serviceMap[serviceName] = grpc.loadPackageDefinition(packageDefinition)[packageName][serviceName].service
                }
            }
            for (let file of res[1]) {
                const filePart = path.parse(file)
                const serviceName = filePart.name.charAt(0).toUpperCase() + filePart.name.slice(1)
                const filePath = path.join(this.implDir, file)
                if (filePart.ext == '.js') {
                    this.functionMap[serviceName] = require(filePath)
                }
            }
            this.start()
        })
    }
    // 运行rpc服务
    start() {
        const server = new grpc.Server()
        for (let serviceName in this.serviceMap) {
            server.addService(this.serviceMap[serviceName], this.functionMap[serviceName])
        }
        server.bind(`${this.ip}:${this.port}`, grpc.ServerCredentials.createInsecure())
        server.start()
    }
}

module.exports = RPCServer