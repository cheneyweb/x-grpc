const protoLoader = require('@grpc/proto-loader')
const grpc = require('grpc')
const fs = require('fs')
const path = require('path')
class RPCServer {
    constructor(grpcConfig) {
        this.ip = grpcConfig.ip || '0.0.0.0'
        this.port = grpcConfig.port
        this.protoDir = `${__dirname}/../..${grpcConfig.protosDir}`
        this.implDir = `${__dirname}/../..${grpcConfig.implsDir}`
        this.services = {}
        this.functions = {}
    }
    // 自动加载proto和js
    run() {
        let files = fs.readdirSync(this.protoDir)
        for (let file of files) {
            const filePart = path.parse(file)
            const serviceName = filePart.name
            const packageName = filePart.name
            const extName = filePart.ext
            const filePath = path.join(this.protoDir, file)
            if (extName == '.proto') {
                // this.services[serviceName] = grpc.load(filePath)[packageName][serviceName].service
                const packageDefinition = protoLoader.loadSync(filePath)
                this.services[serviceName] = grpc.loadPackageDefinition(packageDefinition)[packageName][serviceName].service
            }
        }
        files = fs.readdirSync(this.implDir)
        for (let file of files) {
            const filePart = path.parse(file)
            const serviceName = filePart.name
            // const packageName = filePart.name
            const extName = filePart.ext
            const filePath = path.join(this.implDir, file)
            if (extName == '.js') {
                const functions = require(filePath)
                this.functions[serviceName] = Object.assign({}, functions)
            }
        }
        return this.start()
    }
    // 运行rpc服务
    start() {
        const server = new grpc.Server()
        for (let serviceName of Object.keys(this.services)) {
            const service = this.services[serviceName]
            server.addService(service, this.functions[serviceName])
        }
        server.bind(`${this.ip}:${this.port}`, grpc.ServerCredentials.createInsecure())
        server.start()
    }
}

module.exports = RPCServer