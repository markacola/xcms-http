'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xcmsCore = require('xcms-core');

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

var _statuses = require('statuses');

var _statuses2 = _interopRequireDefault(_statuses);

var _packets = require('./packets');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HttpPlugin = function (_Plugin) {
  _inherits(HttpPlugin, _Plugin);

  function HttpPlugin() {
    _classCallCheck(this, HttpPlugin);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HttpPlugin).call(this, {
      name: 'http',
      handles: 'http-response'
    }));
  }

  _createClass(HttpPlugin, [{
    key: 'listen',
    value: function listen() {
      var server = _http2.default.createServer(this.callback());
      return server.listen.apply(server, arguments);
    }
  }, {
    key: 'callback',
    value: function callback() {
      var _this2 = this;

      return function (req, res) {
        _this2.emit(new _packets.RequestPacket(req, res));
      };
    }
  }, {
    key: 'consumePacket',
    value: function consumePacket(packet) {
      var body = packet.body;
      var res = packet.res;
      var status = packet.status;
      var headers = packet.headers;


      res.statusCode = status;
      res.statusMessage = _statuses2.default[status];

      if (body === null) {
        body = String(status);
        headers.set('Content-Type', 'text');
        headers.set('Content-Length', Buffer.byteLength(body));
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = headers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2);

          var field = _step$value[0];
          var value = _step$value[1];

          res.setHeader(field, value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (Buffer.isBuffer(body)) return res.end(body);
      if (typeof body === 'string') return res.end(body);
      if (body instanceof _stream2.default) return body.pipe(res);

      body = JSON.stringify(body);
      if (!res.headersSent) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Length', Buffer.byteLength(body));
      }
      res.end(body);
    }
  }]);

  return HttpPlugin;
}(_xcmsCore.Plugin);

exports.default = HttpPlugin;