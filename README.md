# x-grpc
[![Build Status](https://travis-ci.com/cheneyweb/x-grpc.svg?branch=master)](https://travis-ci.com/cheneyweb/x-grpc)

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
await rpc.invoke('User.login', { username: 'cheney', password: '123456' })
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
├── docker-compose.yml      // 集群文件
├── envoy                   // grpc-web服务代理
├── sh                      // shell脚本
│   ├── protoc.sh           // 生成grpc-web代码的脚本
│   └── docker-prune.sh     // 清理无效的容器和镜像
├── src                     // x-grpc服务
│   ├── impls               // x-grpc服务逻辑
│   └── protos              // x-grpc服务接口
└── web                     // grpc-web前端演示
    ├── client.js
    ├── dist
    ├── grpc                // 放置通过protoc.sh生成的grpc-web代码
    ├── index.html
    ├── node_modules
    ├── package-lock.json
    └── package.json
```

>单服务启动
npm run start

>单客户端连接（启动前注意config中的serverAddresss填写正确）
node client.js

>WEB服务启动（启动前需要修改envoy/envoy.yaml中的n1_x-grpc为x-grpc）
npm run compose-up

>WEB客户端连接
http://{staticserver}/x-grpc/web/index.html

>集群部署
npm run stack-deploy

>服务拓展
docker service scale n1_x-grpc=3
