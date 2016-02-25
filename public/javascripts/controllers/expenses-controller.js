app.factory('Expenses', ['$resource', function ($resource) {
  return $resource('/expenses/:id', null, 
  {
    'update': {method: 'PUT'}
  });
}]);

app.controller('expensesController', ['$scope', 'Expenses', function ($scope, Expenses) {

  Expenses.query(function (results) {
    $scope.expenses = results;
  });

  $scope.addExpense = function () {
    var newExpense = new Expenses();
    newExpense.id = $scope.newExpenseId;
    newExpense.name = $scope.newExpenseName;
    newExpense.amount = $scope.newExpenseAmount;
    newExpense.spending_date = $scope.newExpenseDate;
    newExpense.$save(function (result) {
      $scope.expenses.push(result);
    });
    $scope.newExpenseName = '';
    $scope.newExpenseAmount = '';
    $scope.newExpenseDate = '';
  }

  $scope.editExpense = function (selectedExpense) {
    $scope.selectedExpenseId = selectedExpense.id;
    $scope.selectedExpenseName = selectedExpense.name;
    $scope.selectedExpenseAmount = selectedExpense.amount;
    $scope.selectedExpenseDate = selectedExpense.spending_date;
  }

  $scope.updateExpense = function (expenseId) {
    var selectedExpense = new Expenses();
    selectedExpense.id = $scope.selectedExpenseId;
    selectedExpense.name = $scope.selectedExpenseName;
    selectedExpense.amount = $scope.selectedExpenseAmount;
    selectedExpense.spending_date = $scope.selectedExpenseDate;
    selectedExpense.$update({ id:selectedExpense.id }, selectedExpense);
    $scope.selectedExpenseId = '';
    $scope.selectedExpenseName = '';
    $scope.selectedExpenseAmount = '';
    $scope.selectedExpenseDate = '';
  }

  $scope.deleteExpense = function (expenseId) {
    Expenses.delete({ id:expenseId });
  }

}]);