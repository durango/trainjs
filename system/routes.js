var routes = require('../routes')
  , app = require('../app')
  , _   = require('underscore');

module.exports.build = function(controllers, middleware) {
  _.each(routes, function(controller, route) {
    var i = route.indexOf(':');
    // If there isn't a method specified, assume "all"
    if (i === -1) {
      route = 'all:' + route;
      i = route.indexOf(':');
    }
    /* Get rid of the method */
    route = [route.slice(0,i), route.slice(i+1)];
    i = route.indexOf('/');
    controller = controller.split('/');
    var cb = controllers[controller[0]][controller[1]];
    if (!_.isUndefined(cb)) {
      app[route[0]](route[1], middleware.set_controller_and_method, middleware.flash, cb);
    }
  });
}