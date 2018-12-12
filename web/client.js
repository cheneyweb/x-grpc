const { LoginReq, LoginRes } = require('./grpc/user_pb.js')
const { UserClient } = require('./grpc/user_grpc_web_pb.js')

let userClient = new UserClient('http://webgame.na77.org:10000')
let loginReq = new LoginReq()
loginReq.setUsername('cheney')
userClient.login(loginReq, {}, (err, res) => {
    console.error(err)
    console.log(res.getRes())
})