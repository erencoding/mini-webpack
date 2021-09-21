const Compiler = require('./compiler');
const option = require('../webpack.config');

new Compiler(option).run();