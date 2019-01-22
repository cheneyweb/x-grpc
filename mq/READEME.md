# MQ集群部署

## 部署
- 本地调试执行：docker-compose -f docker-compose-rabbitmq.yml up -d
- 远程部署执行：npm run stack-deploy

## 例子
- mq/example

## 端口
- 8500  默认consul端口，映射至宿主机：9092
- 15672 默认MQ管理页面端口，映射至宿主机：9093
- 5672  默认消息端口，映射至envoy：10001
