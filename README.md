# x-grpc
NODE分布式服务框架，精巧迷你

>服务端使用说明
```javascript
const RPCServer = require('x-grpc').RPCServer
new RPCServer(config.grpc).run()
```

>客户端使用说明
```javascript
const RPCClient = require('x-grpc').RPCClient
const rpc = new RPCClient(config.grpc)
await rpc.connect()
await rpc.invoke('user.login', { username: 'cheney', password: '123456' })
```

>配置说明（在/config/default.json中，有如下配置）
```javascript
"grpc": {
        "port": 50051,                  // 服务端口
        "protosDir": "/src/protos/",    // 接口目录，放置proto接口定义文件
        "implsDir": "/src/impls/",      // 实现目录，放置js接口实现文件
        "serverAddress": "localhost"    // 服务端的地址，客户端连接时使用
    }
```

>目录结构
```
├── Dockerfile              // x-grpc容器构建文件
├── app.js                  // x-grpc服务入口
├── client.js               // x-grpc客户端演示
├── config                  // x-grpc服务配置
│   ├── default.json
│   ├── develop.json
│   └── production.json
├── docker-compose.yml      // 集群文件
├── envoy                   // x-grpc-web服务代理
│   ├── Dockerfile
│   └── envoy.yaml
├── grpc_modules
│   └── x-grpc
├── node_modules
├── package.json
├── protoc.sh               // 生成grpc-web代码的脚本
├── src                     // x-grpc服务逻辑
│   ├── impls
│   └── protos
└── web                     // grpc-web前端演示
    ├── client.js
    ├── dist
    ├── grpc
    ├── index.html
    ├── node_modules
    ├── package-lock.json
    └── package.json
```

>服务启动
node app.js

>客户端连接
node client.js

>单镜像构建:
docker build -t cheney/x-grpc ./

>集群部署
docker stack deploy --compose-file=stack-compose.yml n1

>服务拓展
docker service scale n1_x-grpc=3