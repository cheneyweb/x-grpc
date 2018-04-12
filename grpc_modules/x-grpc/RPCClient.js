const grpc = require('grpc')
const fs = require('fs')
const path = require('path')
class RPCClient {
  constructor(grpcConfig) {
    this.ip = grpcConfig.serverAddress || 'localhost'
    this.port = grpcConfig.port
    this.protoDir = `${__dirname}/../..${grpcConfig.protosDir}`
    this.services = {}
    this.clients = {}
  }
  // 自动加载proto并且connect
  connect() {
    let protoDir = this.protoDir
    return new Promise((resolve, reject) => {
      const files = fs.readdirSync(protoDir)
      for (let file of files) {
        const filePart = path.parse(file)
        const serviceName = filePart.name
        const packageName = filePart.name
        const extName = filePart.ext
        const filePath = path.join(protoDir, file)
        if (extName == '.proto') {
          const proto = grpc.load(filePath)
          const Service = proto[packageName][serviceName]
          this.services[serviceName] = Service
          this.clients[serviceName] = new Service(`${this.ip}:${this.port}`, grpc.credentials.createInsecure())
        }
      }
      resolve()
    })
  }
  // 远程调用
  invoke(serviceMethod, params = {}) {
    return new Promise((resolve, reject) => {
      const serviceParams = serviceMethod.split('.')
      const serviceName = serviceParams[0]
      const name = serviceParams[1]
      if (this.clients[serviceName] && this.clients[serviceName][name]) {
        this.clients[serviceName][name](params, (err, res) => {
          err ? reject(err) : resolve(res)
        })
      } else {
        reject(new Error(`RPC endpoint: "${serviceName}.${name}" does not exists!`))
      }
    })
  }
}

module.exports = RPCClient