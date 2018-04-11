# x-grpc
NODE分布式服务框架，精巧迷你

>单镜像构建:
docker build -t cheney/x-grpc ./

>集群部署
docker stack deploy --compose-file=stack-compose.yml n1

>服务拓展
docker service scale n1_x-grpc=3