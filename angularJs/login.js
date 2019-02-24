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
    $scope.login_form = true;

    $scope.showRegister = function(){
      $scope.login_form = false;
      $scope.register_form = true;
      $scope.alertMsg = false
    };

    $scope.showLogin = function(){
      $scope.register_form = false;
      $scope.login_form = true;
      $scope.alertMsg = false
    };
  $scope.login = function(){
    $scope.registrations = {}; 
      $http({
        method :'post',
        dataType : 'json',
        data : $scope.user,
        url :'http://localhost/codeigniter/index.php/welcome/login',
        
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
      }).then(function(data){
        debugger
        if(data.errr != '')
        {
         $scope.alertMsg = true;
         $scope.alertClass = 'alert-danger';
         $scope.alertMessage = data.errr;
        }
        else
        {
         location.reload();
        }

        $scope.alertMsg = true;
        $scope.successMessage = "LOGIN successfully";
          $scope.registrations=data;
         
      });
      
  };

  $scope.register = function(){
  
      $scope.registrations = {}; 
        $http({
          method :'post',
          dataType : 'json',
          data : $scope.user,   
          url :'http://localhost/codeigniter/index.php/welcome/add',
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
        }).then(function(data){
          debugger
          $scope.successMessage = "Form submitted successfully";
            $scope.registrations=data;
            if(data.error != '')
            {
             $scope.alertMsg = true;
             $scope.alertMessage = data.error;
            }
            else
            {
             location.reload();
            }
            // window.location = 'index.html';
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