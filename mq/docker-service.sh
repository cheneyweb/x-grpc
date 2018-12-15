docker network create amqp --driver overlay

docker service create  --name mq_consul  --network amqp  -p 8500:8500  -e 'CONSUL_BIND_INTERFACE=eth0'  -e 'CONSUL_LOCAL_CONFIG={"skip_leave_on_interrupt": true}'  consul:latest agent  -server -ui -client=0.0.0.0  -bootstrap-expect=1  -retry-join=mq_consul

docker service create  --name mq_rabbitmq  --network amqp  -p 5672:5672  -p 15672:15672  -e "AUTOCLUSTER_TYPE=consul"  -e "CONSUL_HOST=mq_consul"  -e "CONSUL_PORT=8500"  -e "CONSUL_SVC=rabbitmq"  -e "CONSUL_SVC_ADDR_AUTO=true"  -e "AUTOCLUSTER_CLEANUP=true"  -e "CLEANUP_WARN_ONLY=false"  -e "RABBITMQ_ERLANG_COOKIE=secrect"  cheney/rabbitmq-consul:latest

#docker service update mq_rabbitmq --replicas 2
docker service scale mq_rabbitmq=2

#单独部署rabbitmq服务
docker service create  --name rabbitmq  --network amqp  -p 5672:5672  -p 15672:15672  -e "AUTOCLUSTER_TYPE=consul"  -e "CONSUL_HOST=ext.na77.org"  -e "CONSUL_PORT=8500"  -e "CONSUL_SVC=rabbitmq"  -e "CONSUL_SVC_ADDR_AUTO=true"  -e "AUTOCLUSTER_CLEANUP=true"  -e "CLEANUP_WARN_ONLY=false"  -e "RABBITMQ_ERLANG_COOKIE=secrect"  cheney/rabbitmq-consul:latest
docker service scale rabbitmq=2

#docker inspect <container id> | grep "IPAddress"