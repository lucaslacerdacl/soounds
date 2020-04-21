"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nconf = require("nconf");

var nconf = _interopRequireWildcard(_nconf);

var _path = require("path");

var path = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var configs = new nconf.Provider({
  env: true,
  argv: true,
  store: {
    type: "file",
    file: path.join(__dirname, "./config.json")
  }
});

var getToken = function getToken() {
  var token = configs.get("token");
  return token;
};

exports.default = getToken;