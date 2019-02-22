angular.module('angularFormApp', [])
.controller('ExampleController', ['$scope','$http',
 function($scope,$http) {
  // $scope.master = {};
  
  // $scope.update = function(user) {
  //   $scope.master = angular.copy(user);
  // };
  // $scope.reset = function() {
  //   $scope.user = angular.copy($scope.master);
  // };
    $scope.user = {};   
  $scope.login = function(){
    $scope.registrations = {}; 
      $http({
        method :'post',
        dataType : 'json',
        data : $scope.user,
        url :'http://localhost/codeigniter/index.php/welcome/add',
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
      }).success(function(data){
          $scope.registrations=data;
      });
      
  };
  // $scope.reset();
}]);

angular.module('loginFormApp', [])
.controller('ExampleController', ['$scope','$http',
 function($scope,$http) {
  // $scope.master = {};
  
  // $scope.update = function(user) {
  //   $scope.master = angular.copy(user);
  // };
  // $scope.reset = function() {
  //   $scope.user = angular.copy($scope.master);
  // };
    $scope.user = {};   
  $scope.login = function(){
    $scope.registrations = {}; 
      $http({
        method :'post',
        dataType : 'json',
        data : $scope.user,
        url :'http://localhost/codeigniter/index.php/welcome/login',
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
      }).success(function(data){
          $scope.registrations=data;
      });
      
  };
  // $scope.reset();
}]);


var app = angular.module("indexapp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider

    .when("/login", {
        templateUrl : "login.html"
    })
    .when("/register", {
        templateUrl : "register.html"
    });
});