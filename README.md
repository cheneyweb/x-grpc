# x-grpc
NODE分布式服务框架，精巧迷你

>单镜像构建:
docker build -t cheney/x-grpc ./

>集群部署
docker stack deploy --compose-file=stack-compose.yml n1

>服务拓展
docker service scale n1_x-grpc=3

>服务启动
node app.js

>客户端连接
node client.js

配置说明
>
    在/config/default.json中，有如下配置
```
"grpc": {
        "port": 50051,                  // 服务端口
        "protosDir": "/src/protos/",    // 接口目录
        "implsDir": "/src/impls/",      // 实现目录
        "serverAddress": "localhost"    // 服务端的地址，客户端连接时使用
    }
```