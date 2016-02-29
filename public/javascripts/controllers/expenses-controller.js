/*
 * Expense Provider 
 */
app.factory('Expenses', ['$resource', function ($resource) {

  return $resource('/expenses/:id', {id:'@id'}, 
  {
    'update': {
      method: 'PUT'
    },
    'monthly' : {
      method: 'GET',
      url: '/expenses/monthly/',
      isArray: true
    }
  });
}]);

/*
 * Chart Directive
 */
app.directive("barChart", function($timeout) {

  return {
    restrict: 'EA',
    replace: true,
    scope: {chartData: '=chart'},
    template: '<div id="barGraph"></div>',
    link: function(scope, elem, attr) {

      $timeout(function() {

        var margin = {top: 20, right: 20, bottom: 30, left: 100},
        width = 660 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        // prepare axis
        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .5);
        var y = d3.scale.linear()
            .range([height, 0]);
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .ticks(10);

        // attach to dom
        var svg = d3.select("#barGraph")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .style("fill", "#f3b562")
          .call(xAxis);
        svg.append("g")
          .attr("class", "y axis")
          .style("fill", "#f3b562")
          .call(yAxis)
        svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .style("fill", "#f3b562")
          .text("Amount");

        // update chart on data change
        scope.$watch('chartData',function(data){

          x.domain(data.map(function(d) { return d.yearmonth; }));
          y.domain([0, d3.max(data, function(d) { return parseInt(d.monthlysum); })]);

          var bar = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.yearmonth); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(parseInt(d.monthlysum)); })
            .attr("height", function(d) { return height - y(parseInt(d.monthlysum)); })
            .style("fill", "#f06060");
          
          x.domain(data.map(function(d) { return d.yearmonth; }));
          y.domain([0, d3.max(data, function(d) { return parseInt(d.monthlysum); })]);

          svg.selectAll(".bar")
            .attr("x", function(d) { return x(d.yearmonth); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(parseInt(d.monthlysum)); })
            .attr("height", function(d) { return height - y(parseInt(d.monthlysum)); });
          svg.select(".x.axis")
              .call(xAxis);
          svg.select(".y.axis")
              .call(yAxis);
        });
      }, 100);
    }
  };
});

/*
 * Expense Controller
 */
app.controller('expensesController', ['$scope', 'Expenses', '$interval', function ($scope, Expenses, $interval) {

  // update clientstate
  $scope.refresh = function () {
    Expenses.query(function (results) {
      $scope.expenses = results;
    });

    Expenses.monthly(function (results) {
      $scope.chartData = results;
    });
  }
  $scope.refresh();

  $scope.intervalPromise = $interval(function(){
    $scope.refresh();
  }, 3000);  

  // add new expense
  $scope.addExpense = function () {

    // init new expense
    var newExpense = new Expenses();
    newExpense.id = $scope.newExpenseId;
    newExpense.name = $scope.newExpenseName;
    newExpense.amount = $scope.newExpenseAmount;
    newExpense.spending_date = $scope.newExpenseDate;

    // save
    newExpense.$save(function (result) {
      $scope.expenses.push(result);
    });

    // reset
    $scope.newExpenseName = '';
    $scope.newExpenseAmount = '';
    $scope.newExpenseDate = '';
  }

  // edit selected expense
  $scope.editExpense = function (selectedExpense) {
    $scope.selectedExpenseId = selectedExpense.id;
    $scope.selectedExpenseName = selectedExpense.name;
    $scope.selectedExpenseAmount = selectedExpense.amount;
    $scope.selectedExpenseDate = selectedExpense.spending_date.substring(0,10);
  }

  // send updated expense
  $scope.updateExpense = function (expenseId) {

    // init new value
    var selectedExpense = new Expenses();
    selectedExpense.id = $scope.selectedExpenseId;
    selectedExpense.name = $scope.selectedExpenseName;
    selectedExpense.amount = $scope.selectedExpenseAmount;
    selectedExpense.spending_date = $scope.selectedExpenseDate;

    // update
    selectedExpense.$update({ id:selectedExpense.id }, selectedExpense);

    // reset
    $scope.selectedExpenseId = '-1';
    $scope.selectedExpenseName = '';
    $scope.selectedExpenseAmount = '';
    $scope.selectedExpenseDate = '';
  }

  // delete selected expense
  $scope.deleteExpense = function (expenseId) {

    // delete
    Expenses.delete({ id:expenseId });
  }
}]);