var fs           = require('fs')
  , dir          = __dirname + '/../environments'
  , Environments = {};

fs.readdirSync(dir).forEach(function(name){
  Environments[name.split('.')[0]] = require(dir + '/' + name);
});

module.exports = Environments;