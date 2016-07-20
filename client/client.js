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
  .when('/purchases/:id', {
    templateUrl: 'views/subtractBudget.html',
    controller: 'SubtractController',
    controllerAs: 'subtract'
  })
  .otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);
}]);

app.controller('BudgetController', ['$http', '$location', '$routeParams', function($http, $location, $routeParams){
  var bc = this;
  bc.budgetInput = {};
  bc.budgets = [];
  bc.foodInfo = {};
  bc.years = [];
  /*  arrays for months/years for ng-options.
  *   ranges can easily be updated
  */
  bc.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  for (var i = 2016; i < 2020; i++) {
    bc.years.push(i);
  }

  // console.log('Testing Controller');

  var fetchBudget = function(){
    // console.log('fetchBudget being called');
    $http.get('/budget').then(function(response){
      // console.log('this is response from /budget', response);
      if(response.status !== 200){
        console.log('error in fetchBudget');
      } else {
        bc.budgets = response.data;
        // console.log(bc.budgets);
        return response.data;
      }
    });
  };

  bc.setBudget = function(){
    $http.post('/budget', bc.budgetInput).then(function(response) {
      fetchBudget();
    });
  };

  bc.deleteBudget = function(info){
    var id = info.budget_id;
    $http.delete('/budget/' + id).then(function(response) {
      fetchBudget();
    });
  };

  bc.addPurchases = function(info) {
    // $location.path('/purchases').search({params: info.budget_id});
    $location.path('/purchases/'+info.budget_id);
  };

  /* Keep at bottom to load any data from DB upon page load*/
  fetchBudget();
}]);

app.controller('AboutController', ['$http', function($http){
  var ab = this;
  console.log('AboutController');
}]);

app.controller('SubtractController', ['$http', '$routeParams', function($http, $routeParams){
  var sb = this;
  sb.info = [];
  sb.purchases = [];
  sb.purchase = {};

  var fetchMonthly = function(){
    $http.get('/purchases/' + $routeParams.id).then(function(response){
      console.log(response.data);
      sb.info = response.data.info[0];
      sb.purchases = response.data.purchases;
      return response.data;
    });
  };

  sb.purchased = function() {
    console.log(sb.purchase);
    $http.post('/purchases/' + $routeParams.id, sb.purchase).then(function(response) {
      console.log(response.data);
      fetchMonthly();
    });
  };

  fetchMonthly();
}]);

app.factory("user",function(){
  return {};
});
