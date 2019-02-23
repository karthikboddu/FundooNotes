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
      }).then(function(data){
        $scope.successMessage = "Form submitted successfully";
          $scope.registrations=data;
          // window.location = 'index.html';
      });
      
  };
  // $scope.reset();
}]);



var fetch = angular.module('angularFormApp', []);

fetch.controller('ExampleController', ['$scope', '$http', function ($scope, $http) {
 
 // Check username 
 $scope.checkUsername = function(){
 
  $http({
   method: 'post',
   url: 'http://localhost/codeigniter/index.php/welcome/verify',
   data: {email:$scope.user.email}
  }).then(function successCallback(response) {
   $scope.unamestatus = response.data;
  });
 }

 // Set class
 $scope.addClass = function(unamestatus){
  if(unamestatus == 'Available'){
   return 'response exists';
  }else if(unamestatus == 'Not available'){
   return 'response not-exists';
  }else{
   return 'hide';
  }
 }

}]);
