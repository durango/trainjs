module.exports = function(db, s) {
  var partners = db.define('partners', {
    name:         s.STRING,
    domain:       s.STRING,
    api:          s.STRING,
    payment_type: s.INTEGER
  });

  var partner_users = db.define('partner_users', {
    id: { type: s.INTEGER, primaryKey: true },
    username: s.STRING,
    password: s.STRING,
    type: s.INTEGER,
    email: s.STRING,
    domain: s.STRING
  });

  return [partners, partner_users];
}