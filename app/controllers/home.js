var model;

var home = {
  index: function(req, res) {
    res.render('home/index');
  },
  register: function(req, res) {
    res.render('home/register');
  },
  create: function(req, res) {
    req.session.flash.msg = 'Account created!';
    res.redirect('/register');
  }
}

module.exports = function(models) {
  model = models;
  return home;
}