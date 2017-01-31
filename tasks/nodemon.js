var nodemon = require('nodemon');
var watch = require('watch');
var fs = require('fs');

var basePath = __dirname + '/../src/server/'

// NODE_ENV=development nodemon --exec npm run babel-app src/app.js --kill-others
// ROOT=/path/to/my/abesite node src/tasks/nodemon.js

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
    "docs/*",
    "dist/*"
  ],
  watch: [
	 'server/**/*.*'
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
  console.log('Kill process nodemon');
  process.exit();
}).on('restart', function (files) {
  console.log('------------------------------------------------------------');
  console.log('App restarted due to: ', files[0]);
});