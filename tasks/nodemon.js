var nodemon = require('nodemon');
var watch = require('watch');
var fs = require('fs');
var clc = require('cli-color');

var basePath = __dirname + '/../src/server/'

nodemon({
  script: basePath + 'index.js',
  options: {
    exec: __dirname + '/../node_modules/.bin/babel-node --presets es2015'
  },
  nodeArgs: ['--debug'],
  restartable: 'rs',
  colours: true,
  execMap: {
    js: __dirname + '/../node_modules/.bin/babel-node --presets es2015'
  },
  env: {
    'NODE_ENV': process.env.NODE_ENV || 'prod'
  },
  ignore: [
    "server/scripts/*",
    "docs/*",
    "static/*"
  ],
  watch: [
	 'src/server/**/*.js'
  ],
  stdin: true,
  runOnChangeOnly: false,
  verbose: true,
  // 'stdout' refers to the default behaviour of a required nodemon's child,
  // but also includes stderr. If this is false, data is still dispatched via
  // nodemon.on('stdout/stderr')
  stdout: true
});

nodemon.on('start', function () {
}).on('quit', function () {
  console.log(clc.green('Kill process nodemon'))
  process.exit();
}).on('restart', function (files) {
  console.log(clc.green('App restarted due to: '), files[0])
});