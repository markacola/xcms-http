'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpError = undefined;

var _es6Error = require('es6-error');

var _es6Error2 = _interopRequireDefault(_es6Error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HttpError = exports.HttpError = function (_ExtendableError) {
  _inherits(HttpError, _ExtendableError);

  function HttpError(err) {
    _classCallCheck(this, HttpError);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HttpError).call(this, err));
  }

  return HttpError;
}(_es6Error2.default);