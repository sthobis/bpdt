var Expense = require('../models/expense.js');

module.exports.list = function (req, res) {

  Expense.all()
    .then(function (data) {
      res.json(data);
    })
    .catch(function (error) {
        console.log('ERROR:', error);
    });
}

module.exports.get = function (req, res) {

  Expense.get(req.params.id)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (error) {
        console.log('ERROR:', error);
    });
}

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

module.exports.update = function (req, res) {

  var expenseObj = {
    id : req.params.id,
    name : req.body.name,
    amount : req.body.amount,
    spending_date : req.body.spending_date
  }

  Expense.update(expenseObj)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (error) {
        console.log('ERROR:', error);
    });
}

module.exports.delete = function (req, res) {

  Expense.delete(req.params.id)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (error) {
        console.log('ERROR:', error);
    });
}