/**
 * @fileoverview gRPC-Web generated client stub for demo
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.demo = require('./user_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.demo.UserClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.demo.UserPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.demo.UserClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.demo.UserClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.demo.LoginReq,
 *   !proto.demo.LoginRes>}
 */
const methodInfo_User_login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.demo.LoginRes,
  /** @param {!proto.demo.LoginReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.demo.LoginRes.deserializeBinary
);


/**
 * @param {!proto.demo.LoginReq} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.demo.LoginRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.demo.LoginRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.demo.UserClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/demo.User/login',
      request,
      metadata,
      methodInfo_User_login,
      callback);
};


/**
 * @param {!proto.demo.LoginReq} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.demo.LoginRes>}
 *     The XHR Node Readable Stream
 */
proto.demo.UserPromiseClient.prototype.login =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.login(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.demo.LogoutReq,
 *   !proto.demo.LogoutRes>}
 */
const methodInfo_User_logout = new grpc.web.AbstractClientBase.MethodInfo(
  proto.demo.LogoutRes,
  /** @param {!proto.demo.LogoutReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.demo.LogoutRes.deserializeBinary
);


/**
 * @param {!proto.demo.LogoutReq} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.demo.LogoutRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.demo.LogoutRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.demo.UserClient.prototype.logout =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/demo.User/logout',
      request,
      metadata,
      methodInfo_User_logout,
      callback);
};


/**
 * @param {!proto.demo.LogoutReq} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.demo.LogoutRes>}
 *     The XHR Node Readable Stream
 */
proto.demo.UserPromiseClient.prototype.logout =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.logout(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.demo;

