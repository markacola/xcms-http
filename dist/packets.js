'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponsePacket = exports.RequestPacket = undefined;

var _xcmsCore = require('xcms-core');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RequestPacket = exports.RequestPacket = function (_Packet) {
  _inherits(RequestPacket, _Packet);

  function RequestPacket(req, res) {
    _classCallCheck(this, RequestPacket);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RequestPacket).call(this, {
      type: 'http-request',
      req: req,
      res: res
    }));
  }

  return RequestPacket;
}(_xcmsCore.Packet);

var ResponsePacket = exports.ResponsePacket = function (_Packet2) {
  _inherits(ResponsePacket, _Packet2);

  function ResponsePacket(req, res) {
    _classCallCheck(this, ResponsePacket);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ResponsePacket).call(this, {
      type: 'http-response',
      req: req,
      res: res,
      status: 404,
      headers: new Map(),
      body: null
    }));
  }

  return ResponsePacket;
}(_xcmsCore.Packet);