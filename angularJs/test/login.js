angular.module('loginFormApp', ["ngStorage"])
.controller('ExampleController', ['$scope','$http','$window',
 function($scope,$localStorage,$window) {
  // $scope.master = {};
  
  // $scope.update = function(user) {
  //   $scope.master = angular.copy(user);
  // };
  // $scope.reset = function() {
  //   $scope.user = angular.copy($scope.master);
  // };
//     $scope.user = {};   
//     $scope.login_form = true;

//     $scope.showRegister = function(){
//       $scope.login_form = false;
//       $scope.register_form = true;
//       $scope.alertMsg = false
//     };

//     $scope.showLogin = function(){
//       $scope.register_form = false;
//       $scope.login_form = true;
//       $scope.alertMsg = false
//     };
//   $scope.login = function(){
//     $scope.registrations = {}; 
//       $http({
//         method :'post',
//         dataType : 'json',
//         data : $scope.user,
//         url :'http://localhost/codeigniter/sigin',
//         headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
//       }).then(function(data){
//         debugger
//         // alert(data);
//         // alert(data[error]);
//         if(data.data.errr != '')
//         {
//          $scope.alertMsg = true;
//          $scope.alertClass = 'alert-danger';
//          $scope.alertMessage = data.data.errr;
//         }
//         else
//         {
//         //   location.reload();
//         $window.location.href = 'http://localhost/codeigniter/angularJs/home.php';
//         $scope.alertMsg = true;
//         $scope.successMessage = "LOGIN successfully";
//           $scope.registrations=data;
//         }


         
//       });
      
//   };

$scope.Save = function () {  
    $localStorage.LocalMessage = $scope.email + $scope.password;  


    $window.open('http://localhost/codeigniter/angularJs/test/demo3.html', 'testpopup', 'width=500,height=400');  
}

}]);