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
  var bc = this;
  bc.budget = 0;
  bc.budgetInput = 0;
  console.log('Testing Controller');

  bc.setBudget = function(budgetInput){
    bc.budget = bc.budget + bc.budgetInput;
    console.log('bc.budget', bc.budget);
    return bc.budget;
  }
})
