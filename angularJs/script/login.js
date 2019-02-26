angular.module('loginFormApp', [])
.controller('ExampleController', ['$scope','$http','$window',
 function($scope,$http,$window) {

    $scope.user = {};   
    $scope.login_form = true

  //   $window.localStorage.setItem('email', $scope.email);
  //   var username = $window.localStorage.getItem('email');
  //  $log.debug('username : ' + username);
  $scope.login = function(){
    $scope.registrations = {}; 
      $http({
        method :'post',
        dataType : 'json',
        data : $scope.user,
        url :'http://localhost/codeigniter/sigin',
        headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
      }).then(function(data){
        debugger
        // alert(data);
        // alert(data[error]);
        if(data.data.errr != '')
        {
         $scope.alertMsg = true;
         $scope.alertClass = 'alert-danger';
         $scope.alertMessage = data.data.errr;
        }
        else
        {
        //   location.reload(); 
       
        $window.location.href = 'http://localhost/codeigniter/angularJs/home.php';
        $scope.alertMsg = true;
     
          
        $scope.successMessage = "LOGIN successfully";
          $scope.registrations=data;
        }

      });
      
  };
}]);


$(document).ready(function(){
  $(".ip").mouseover(function(){
    $(".ip").css("background-color","lightgray");
  })
  $(".ip").mouseout(function(){
    $(".ip").css("background-color","white");
  })
  });