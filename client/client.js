var app = angular.module('foodManagementApp', ['ngRoute']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'views/budget.html',
    controller: 'BudgetController',
    controllerAs: 'budget'
  })
  .when('/about', {
    templateUrl: 'views/about.html',
    controller: 'AboutController',
    controllerAs: 'about'
  })
  $locationProvider.html5Mode(true);
}]);
app.controller('BudgetController', ['$http', function($http){
  var bc = this;
  bc.budget = 0;
  bc.budgetInput = '';
  bc.budgets = [];
  console.log('Testing Controller');

  var fetchBudget = function(){
    console.log('fetchBudget being called');
    $http.get('/budget').then(function(response){
      console.log('this is response from /budget', response);
      if(response.status !== 200){
        console.log('error in fetchBudget');
      } else {
        bc.budgets = response.data;
        console.log(bc.budgets);
        return response.data;
      }
    })
  }
  bc.setBudget = function(budgetInput){
    bc.budget = bc.budgetInput;
    $http.post('/budget',
    {budget: bc.budget}
  ).then(fetchBudget);
    bc.budgetInput = '';
    console.log('bc.budget', bc.budget);
  }
  bc.deleteBudget = function(id){
    console.log('deleteBudget is being called');
    console.log('param of deleteBudget', id);
    $http.delete('/budget/' + id).then(fetchBudget);
  }
  fetchBudget();
}])
app.controller('AboutController', ['$http', function($http){
  var ab = this;
  console.log('AboutController');
}]);
