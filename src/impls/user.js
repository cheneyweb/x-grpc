function login(call, cb) {
  cb(null, { res: 'Hello ' + call.request.username })
}

module.exports = { login }

