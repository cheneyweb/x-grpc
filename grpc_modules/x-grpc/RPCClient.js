const protoLoader = require('@grpc/proto-loader')
const grpc = require('grpc')
const fs = require('fs')
const path = require('path')
class RPCClient {
  constructor(grpcConfig) {
    this.ip = grpcConfig.serverAddress || 'localhost'
    this.port = grpcConfig.port
    this.protoDir = `${__dirname}/../..${grpcConfig.protosDir}`
    this.loaderOptions = grpcConfig.loaderOptions
    this.serviceMap = {}
  }
  // 自动加载proto并且connect
  connect() {
    return new Promise((resolve, reject) => {
      const protoPackageArr = fs.readdirSync(this.protoDir)
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
            const Service = grpc.loadPackageDefinition(packageDefinition)[packageName][serviceName]
            this.serviceMap[packageName][serviceName] = new Service(`${this.ip}:${this.port}`, grpc.credentials.createInsecure())
          }
        }
      }
      resolve(this)
    })
  }
  // 远程调用
  invoke(serviceMethod, params = {}) {
    return new Promise((resolve, reject) => {
      const [packageName, serviceName, methodname] = serviceMethod.split('.')
      if (this.serviceMap[packageName] && this.serviceMap[packageName][serviceName] && this.serviceMap[packageName][serviceName][methodname]) {
        this.serviceMap[packageName][serviceName][methodname](params, (err, res) => {
          err ? reject(err) : resolve(res)
        })
      } else {
        reject(new Error(`RPC endpoint: "${serviceMethod}" does not exists!`))
      }
    })
  }
}

module.exports = RPCClient