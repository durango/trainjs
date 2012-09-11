module.exports = function(app, config){
  var Sequelize = require('sequelize')
  , _           = require('underscore')
  , fs          = require('fs')
  , dir         = __dirname + '/../app/models'
  , config      = config.db[app.settings.env]
  , models      = {}
  , Models      = {};

  var db = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.driver,
    port: config.port
  });

  fs.readdirSync(dir).forEach(function(name){
    Models[name.split('.')[0]] = db.import(dir + '/' + name);
  });

  _.each(Models, function(value, index){
    if (_.isArray(value)){
      _.each(value, function(v, i){
        models[v.name] = v;
      });
    }
  });
  return models;
}