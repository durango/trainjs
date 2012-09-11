var _       = require('underscore')
  , app     = require('../app')
  , routes  = require('../routes');

/* Middleware for setting controller/method  */
module.exports.set_controller_and_method = function(req, res, next){
  app.set('controller', '');
  app.set('method', '');

  var the_controller = routes[req.route.method + ':' + req.route.path];
  if (!_.isUndefined(the_controller)){
    the_controller = the_controller.split('/');
    var the_method = the_controller[1];
    the_controller = the_controller[0];

    app.set('controller', the_controller);
    app.set('method', the_method);
  }
  next();
}

/* Middleware for flash session messages */
module.exports.flash = function(req, res, next){
  app.set('flash', '');
  req.session.flash = req.session.flash || {};
  if (!_.isEmpty(req.session.flash)) {
    app.set('flash', req.session.flash);
    req.session.flash = {};
  }
  next();
}