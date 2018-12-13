/**
 * @fileoverview gRPC-Web generated client stub for transaction
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.transaction = require('./bank_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.transaction.BankClient =
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
proto.transaction.BankPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.transaction.BankClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.transaction.BankClient(
      hostname, credentials, options);

};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.transaction.TransferReq,
 *   !proto.transaction.TransferRes>}
 */
const methodInfo_Bank_transfer = new grpc.web.AbstractClientBase.MethodInfo(
  proto.transaction.TransferRes,
  /** @param {!proto.transaction.TransferReq} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.transaction.TransferRes.deserializeBinary
);


/**
 * @param {!proto.transaction.TransferReq} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.transaction.TransferRes)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.transaction.TransferRes>|undefined}
 *     The XHR Node Readable Stream
 */
proto.transaction.BankClient.prototype.transfer =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/transaction.Bank/transfer',
      request,
      metadata,
      methodInfo_Bank_transfer,
      callback);
};


/**
 * @param {!proto.transaction.TransferReq} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.transaction.TransferRes>}
 *     The XHR Node Readable Stream
 */
proto.transaction.BankPromiseClient.prototype.transfer =
    function(request, metadata) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.transfer(
      request, metadata, (error, response) => {
        error ? reject(error) : resolve(response);
      });
  });
};


module.exports = proto.transaction;

