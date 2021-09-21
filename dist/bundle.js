
(function(modules) {
  function require(fileName) {
    const fn = modules[fileName];
    const module = { exports:{} };
    fn(require, module, module.exports);
    return module.exports;
  }
  require('/Users/caojun/Documents/project/mini-webpack/src/index.js')
})({'/Users/caojun/Documents/project/mini-webpack/src/index.js': function(require, module, exports) {"use strict";

var _greeting = require("./greeting.js");

var _about = require("./about.js");

var _about2 = _interopRequireDefault(_about);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.write((0, _greeting.greeting)("Eren") + '\n' + (0, _about2.default)());},'./greeting.js': function(require, module, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;

function greeting(name) {
  console.log('print something');
  return "hello " + name;
}},'./about.js': function(require, module, exports) {"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = about;

function about() {
  return 'i am a fe programer.';
}},})
    