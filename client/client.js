var app = angular.module('foodManagementApp', ['ngRoute']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: '/',
    controller: 'BudgetController',
    controllerAs: 'budget'
  })
  $locationProvider.html5Mode(true);
}]);
app.controller('BudgetController', function(){
  var budget = 0;
  var budgetInput = 0;
  console.log('Testing Controller');

  var setBudget = function(budgetInput){
    budget = budget + budgetInput;
    console.log(budget);
    return budget;
  }
})
