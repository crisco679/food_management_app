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
app.controller('BudgetController', ['$http', function($http){
  var bc = this;
  bc.budget = 0;
  bc.budgetInput = 0;
  console.log('Testing Controller');

  var fetchBudget = function(){
    console.log('fetchBudget being called');
    $http.get('/budget').then(function(response){
      console.log('this is response from /budget', response);
      if(response.status !== 200){
        console.log('error in fetchBudget');
      } else {
        bc.budget = 0;
        return response.data;
      }
    })
  }
  bc.setBudget = function(budgetInput){
    bc.budget = bc.budget + bc.budgetInput;
    $http.post('/budget',
    {budget: bc.budget}
  ).then(fetchBudget);
    console.log('bc.budget', bc.budget);
  }
}])
