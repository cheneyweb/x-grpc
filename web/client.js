const { LoginReq, LoginRes } = require('./grpc/demo/user_pb.js')
const { UserClient } = require('./grpc/demo/user_grpc_web_pb.js')

let userClient = new UserClient('http://ext.na77.org:10000')

let loginReq = new LoginReq()
loginReq.setUsername('cheney')
loginReq.setPassword('123456')
userClient.login(loginReq, {}, (err, res) => {
    console.error(err)
    console.log(res.getRes())
})