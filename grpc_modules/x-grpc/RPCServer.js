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
        this.loaderOptions = grpcConfig.loaderOptions
        this.serviceMap = {}
        this.functionMap = {}
    }
    // 自动加载proto和js
    run() {
        const protoPackageArr = fs.readdirSync(this.protoDir)
        const implPackageArr = fs.readdirSync(this.implDir)
        // 遍历protos所有package
        for (let packageName of protoPackageArr) {
            const protoArr = fs.readdirSync(`${this.protoDir}${packageName}`)
            this.serviceMap[packageName] = {}
            for (let file of protoArr) {
                const filePart = path.parse(file)
                if (filePart.ext == '.proto') {
                    const serviceName = filePart.name.charAt(0).toUpperCase() + filePart.name.slice(1)
                    const filePath = path.join(`${this.protoDir}${packageName}`, file)
                    const packageDefinition = protoLoader.loadSync(filePath, this.loaderOptions)
                    this.serviceMap[packageName][serviceName] = grpc.loadPackageDefinition(packageDefinition)[packageName][serviceName].service
                }
            }
        }
        // 遍历impls所有package
        for (let packageName of implPackageArr) {
            const implArr = fs.readdirSync(`${this.implDir}${packageName}`)
            this.functionMap[packageName] = {}
            for (let file of implArr) {
                const filePart = path.parse(file)
                if (filePart.ext == '.js') {
                    const serviceName = filePart.name.charAt(0).toUpperCase() + filePart.name.slice(1)
                    const filePath = path.join(`${this.implDir}${packageName}`, file)
                    this.functionMap[packageName][serviceName] = require(filePath)
                }
            }
        }
        this.start()
    }
    // 运行rpc服务
    start() {
        const server = new grpc.Server()
        for (let packageName in this.serviceMap) {
            for (let serviceName in this.serviceMap[packageName]) {
                server.addService(this.serviceMap[packageName][serviceName], this.functionMap[packageName][serviceName])
            }
        }
        server.bind(`${this.ip}:${this.port}`, grpc.ServerCredentials.createInsecure())
        server.start()
    }
}

module.exports = RPCServer