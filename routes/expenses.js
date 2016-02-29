var express = require('express');
var router = express.Router();
var expensesController = require('../server/controllers/expenses-controller.js');

/*
 * GET monthly expenses 
 */
router.get('/monthly/', expensesController.monthly);

/*
 * GET particular expense
 */
router.get('/:id', expensesController.get);

/*
 * LIST expense 
 */
router.get('/', expensesController.list);

/*
 * POST new expense. 
 */
router.post('/', expensesController.create);

/*
 * UPDATE new expense. 
 */
router.put('/:id', expensesController.update);

/*
 * DELETE new expense. 
 */
router.delete('/:id', expensesController.delete);

module.exports = router;
