var settings = require('./config.js');
var pgp = require('pg-promise')(/*options*/);
var db = pgp('postgres://'+settings.pgUser+':'+settings.pgPassword+'@'+settings.host+':'+settings.port+'/'+settings.db);

module.exports.all = function () {
  return db.any('SELECT * FROM expenses');
}

module.exports.get = function (expenseId) {
  return db.any('SELECT * FROM expenses WHERE id = $1', expenseId);
}

module.exports.new = function (newExpense) {
  return db.none('INSERT INTO expenses (name, amount, spending_date) VALUES (${name},${amount},${spending_date})', newExpense);
}

module.exports.update = function (newExpense) {
  return db.any('UPDATE expenses SET name = ${name}, amount = ${amount}, spending_date = ${spending_date} WHERE id = ${id}', newExpense);
}

module.exports.delete = function (expenseId) {
  return db.any('DELETE FROM expenses WHERE ID = $1', expenseId);
}
