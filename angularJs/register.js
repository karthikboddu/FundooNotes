var fetch = angular.module('angularFormApp', []);

fetch.controller('ExampleController', ['$scope', '$http', function ($scope, $http) {
 
 // Check username 
 $scope.checkUsername = function(){
 
  $http({
   method: 'post',
   url: 'http://localhost/codeigniter/index.php/welcome/verify',
   data: {email:$scope.email}
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