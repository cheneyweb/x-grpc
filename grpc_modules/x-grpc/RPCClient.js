const protoLoader = require('@grpc/proto-loader')
const grpc = require('grpc')
const fs = require('fs').promises
const path = require('path')
class RPCClient {
  constructor(grpcConfig) {
    this.ip = grpcConfig.serverAddress || 'localhost'
    this.port = grpcConfig.port
    this.protoDir = `${__dirname}/../..${grpcConfig.protosDir}`
    this.loaderOptions = grpcConfig.loaderOptions
    this.clients = {}
  }
  // 自动加载proto并且connect
  connect() {
    return new Promise((resolve, reject) => {
      fs.readdir(this.protoDir).then((res) => {
        for (let file of res) {
          const filePart = path.parse(file)
          const packageName = filePart.name
          const serviceName = filePart.name
          const extName = filePart.ext
          const filePath = path.join(this.protoDir, file)
          if (extName == '.proto') {
            const packageDefinition = protoLoader.loadSync(filePath, this.loaderOptions)
            const Service = grpc.loadPackageDefinition(packageDefinition)[packageName][serviceName]
            this.clients[serviceName] = new Service(`${this.ip}:${this.port}`, grpc.credentials.createInsecure())
          }
        }
        resolve()
      })
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