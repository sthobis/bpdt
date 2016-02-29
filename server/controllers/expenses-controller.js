var Expense = require('../models/expense.js');

/*
 * Expense query controller
 */
module.exports.list = function (req, res) {

  Expense.all()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (error) {
        console.log('ERROR:', error);
    });
}

/*
 * Expense selection controller
 */
module.exports.get = function (req, res) {

  Expense.get(req.params.id)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (error) {
        console.log('ERROR:', error);
    });
}

/*
 * Expense insertion controller
 */
module.exports.create = function (req, res) {

  var expenseObj = {
    name : req.body.name,
    amount : req.body.amount,
    spending_date : req.body.spending_date
  }

  Expense.new(expenseObj)
    .then(function (data) {
        res.json(data);
    })
    .catch(function (error) {
        console.log('ERROR:', error);
    });
}

/*
 * Expense update controller
 */
module.exports.update = function (req, res) {

  var expenseObj = {
    id : req.params.id,
    name : req.body.name,
    amount : req.body.amount,
    spending_date : req.body.spending_date
  }

  Expense.update(expenseObj)
    .then(function () {
      res.json({ message: 'Data updated.' });
    })
    .catch(function (error) {
        console.log('ERROR:', error);
    });
}

/*
 * Expense removal controller
 */
module.exports.delete = function (req, res) {

  Expense.delete(req.params.id)
    .then(function (data) {
      res.json({ message: 'Data deleted.' });
    })
    .catch(function (error) {
        console.log('ERROR:', error);
    });
}

/*
 * Expense query controller (monthly)
 */
module.exports.monthly = function (req, res) {

  Expense.monthly()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (error) {
        console.log('ERROR:', error);
    });
}