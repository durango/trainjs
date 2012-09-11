var fs = require('fs')
  , dir         = __dirname + '/../configs'
  , Configs     = {};

fs.readdirSync(dir).forEach(function(name){
  Configs[name.split('.')[0]] = require(dir + '/' + name);
});

module.exports = Configs;