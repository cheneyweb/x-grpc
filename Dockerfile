# FROM node
FROM node:alpine
# 创建应用目录
RUN mkdir -p /usr/node/x-grpc
# 设置工作目录
WORKDIR /usr/node/x-grpc
# 复制所有文件到工作目录
COPY . /usr/node/x-grpc
# 编译运行node项目
RUN npm install
# 运行命令
CMD ["npm", "start"]
