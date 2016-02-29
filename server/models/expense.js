var settings = require('./config.js');
var pgp = require('pg-promise')(/*options*/);
var db = pgp('postgres://'+settings.pgUser+':'+settings.pgPassword+'@'+settings.host+':'+settings.port+'/'+settings.db);

/*
 * Expense model query
 */
module.exports.all = function () {
  return db.any('SELECT * FROM expenses ORDER BY spending_date DESC');
}

/*
 * Expense model getter
 */
module.exports.get = function (expenseId) {
  return db.any('SELECT * FROM expenses WHERE id = $1', expenseId);
}

/*
 * Expense model constructor
 */
module.exports.new = function (newExpense) {
  return db.none('INSERT INTO expenses (name, amount, spending_date) VALUES (${name},${amount},${spending_date})', newExpense);
}

/*
 * Expense model update/setter
 */
module.exports.update = function (newExpense) {
  return db.any('UPDATE expenses SET name = ${name}, amount = ${amount}, spending_date = ${spending_date} WHERE id = ${id}', newExpense);
}

/*
 * Expense model destructor
 */
module.exports.delete = function (expenseId) {
  return db.none('DELETE FROM expenses WHERE ID = $1', expenseId);
}

/*
 * Expense model query monthly
 */
module.exports.monthly = function () {
  return db.any('SELECT TO_CHAR( DATE_TRUNC(\'month\', spending_date), \'Mon-YY\') AS yearMonth, SUM(amount) AS monthlySum FROM expenses GROUP BY spending_date ORDER BY spending_date');
}