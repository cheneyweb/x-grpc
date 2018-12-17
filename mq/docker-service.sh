#创建amqp网络
docker network create amqp --driver overlay
#部署consul集群
docker stack deploy --prune -c docker-compose.yml mq
#创建consul服务（mq_consul是发现服务的主机地址，多台主机时，retry-join直接设置多台主机的IP数组即可["192.168.2.210","192.168.2.211","192.168.2.212"]）
# docker service create --name mq_consul --network amqp -p 9092:8500 -e 'CONSUL_BIND_INTERFACE=eth0' -e 'CONSUL_LOCAL_CONFIG={"skip_leave_on_interrupt": true}' consul:latest agent -server -ui -client=0.0.0.0 -bootstrap-expect=1 -retry-join=mq_consul

#创建rabbitmq服务（指定consul集群网络地址为amqp.cluster）
docker service create --name mq_rabbitmq --network amqp -p 9093:15672 -p 5672:5672 -e "AUTOCLUSTER_TYPE=consul" -e "CONSUL_HOST=amqp.cluster" -e "CONSUL_PORT=8500" -e "CONSUL_SVC=rabbitmq" -e "CONSUL_SVC_ADDR_AUTO=true" -e "AUTOCLUSTER_CLEANUP=true" -e "CLEANUP_WARN_ONLY=false" -e "RABBITMQ_ERLANG_COOKIE=secrect" cheney/rabbitmq-consul:latest

#拓展consul和rabbitmq集群
# docker service scale mq_consul=2 -d
# docker service update mq_consul --replicas 2
docker service scale mq_rabbitmq=2
# docker service update mq_rabbitmq --replicas 2

#进入容器查看IP
# docker inspect <container id> | grep "IPAddress"