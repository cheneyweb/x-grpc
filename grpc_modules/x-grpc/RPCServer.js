const grpc = require('grpc')
const fs = require('fs')
const path = require('path')
class RPCServer {
    constructor(port, ip = '0.0.0.0') {
        this.ip = ip
        this.port = port
        this.services = {}
        this.functions = {}
    }
    // 自动加载proto
    load(protoDir, implDir) {
        let files = fs.readdirSync(protoDir)
        for (let file of files) {
            const filePart = path.parse(file)
            const serviceName = filePart.name
            const packageName = filePart.name
            const extName = filePart.ext
            const filePath = path.join(protoDir, file)
            if (extName == '.proto') {
                this.services[serviceName] = grpc.load(filePath)[packageName][serviceName].service
            }
        }
        files = fs.readdirSync(implDir)
        for (let file of files) {
            const filePart = path.parse(file)
            const serviceName = filePart.name
            const packageName = filePart.name
            const extName = filePart.ext
            const filePath = path.join(implDir, file)
            if (extName == '.js') {
                const functions = require(filePath)
                this.functions[serviceName] = Object.assign({}, functions)
            }
        }
        return this.run()
    }
    // 运行Server
    run() {
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