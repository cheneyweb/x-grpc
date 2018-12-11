/**
 * @fileoverview gRPC-Web generated client stub for user
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.user = require('./user_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.user.UserClient =
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
proto.user.UserPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.user.UserClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.user.UserClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.user.LoginReq,
 *   !proto.user.LoginRes>}
 */
const methodInfo_User_login = new grpc.web.AbstractClientBase.MethodInfo(
  proto.user.LoginRes,
  /** @param {!proto.user.LoginReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.LoginRes.deserializeBinary
);


/**
 * @param {!proto.user.LoginReq} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.user.LoginRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.LoginRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UserClient.prototype.login =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.User/login',
      request,
      metadata,
      methodInfo_User_login,
      callback);
};


/**
 * @param {!proto.user.LoginReq} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.LoginRes>}
 *     The XHR Node Readable Stream
 */
proto.user.UserPromiseClient.prototype.login =
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
 *   !proto.user.LogoutReq,
 *   !proto.user.LogoutRes>}
 */
const methodInfo_User_logout = new grpc.web.AbstractClientBase.MethodInfo(
  proto.user.LogoutRes,
  /** @param {!proto.user.LogoutReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.LogoutRes.deserializeBinary
);


/**
 * @param {!proto.user.LogoutReq} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.user.LogoutRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.LogoutRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UserClient.prototype.logout =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.User/logout',
      request,
      metadata,
      methodInfo_User_logout,
      callback);
};


/**
 * @param {!proto.user.LogoutReq} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.LogoutRes>}
 *     The XHR Node Readable Stream
 */
proto.user.UserPromiseClient.prototype.logout =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.logout(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.user;

