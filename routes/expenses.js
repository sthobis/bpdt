var express = require('express');
var router = express.Router();
var expensesController = require('../server/controllers/expenses-controller.js');

/* LIST expense */
router.get('/', expensesController.list);

/* GET expense. */
router.get('/:id', expensesController.get);

/* POST new expense. */
router.post('/', expensesController.create);

/* UPDATE new expense. */
router.put('/:id', expensesController.update);

/* DELETE new expense. */
router.delete('/:id', expensesController.delete);

module.exports = router;
