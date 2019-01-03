const protoLoader = require('@grpc/proto-loader')
const grpc = require('grpc')
const fs = require('fs')
const path = require('path')
// 由于grpc的Server暂不支持拦截器，故引入第三方代理拦截器
const interceptors = require('@echo-health/grpc-interceptors')
class RPCServer {
    constructor(grpcConfig) {
        this.ip = grpcConfig.ip || '0.0.0.0'
        this.port = grpcConfig.port
        this.protoDir = `${__dirname}/../..${grpcConfig.protosDir}`
        this.implDir = `${__dirname}/../..${grpcConfig.implsDir}`
        this.loaderOptions = grpcConfig.loaderOptions
        this.serviceMap = {}
        this.functionMap = {}
        this.server = {}
        this._load()
    }
    // 自动加载proto和js
    _load() {
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
        this._bind()
    }
    // 绑定服务
    _bind() {
        this.server = new grpc.Server()
        // 第三方代理拦截器
        this.server = interceptors.serverProxy(this.server)
        // 第三方代理拦截器
        for (let packageName in this.serviceMap) {
            for (let serviceName in this.serviceMap[packageName]) {
                this.server.addService(this.serviceMap[packageName][serviceName], this.functionMap[packageName][serviceName])
            }
        }
        this.server.bind(`${this.ip}:${this.port}`, grpc.ServerCredentials.createInsecure())
    }
    // 加载拦截器中间件
    use(middleware) {
        this.server.use(middleware)
    }
    // 启动监听
    listen() {
        this.server.start()
    }
}

module.exports = RPCServer