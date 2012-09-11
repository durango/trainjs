module.exports = function(models) {
  var fs          = require('fs')
    , dir         = __dirname + '/../app/controllers'
    , Controllers = {};

  fs.readdirSync(dir).forEach(function(name){
    Controllers[name.split('.')[0]] = require(dir + '/' + name)(models);
  });

  return Controllers;
}