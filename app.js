
/**
 * Module dependencies.
 */

var express     = require('express')
  , http        = require('http')
  , path        = require('path')
  , app         = module.exports = express()
  , _           = require('underscore')
  , middleware  = require('./system/middleware')
  , env         = require('./system/environments')
  , configs     = require('./system/configs')
  , models      = require('./system/models')(app, configs)
  , controllers = require('./system/controllers')(models)
  , routes      = require('./system/routes');

/* Generic configuration */
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('SIWJ29@#*1Hsja'));
  app.use(express.session());
  // Get partnership config file.
  app.use(function(req, res, next){
    var sub = req.subdomains[0];
    if (!sub in env) {
      res.send(404, 'Partnership doesn\'t exist');
    } else {
      app.set('partner', env[sub]);
    }
    next();
  });
  app.use(app.router);
  app.use(express.errorHandler());
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

/* Build our routes */
routes.build(controllers, middleware);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
