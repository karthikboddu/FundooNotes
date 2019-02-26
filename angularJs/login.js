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
          url :'http://localhost/codeigniter/insert',
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
        }).then(function(data){
          $scope.alertMsg = true;
          debugger;
          // alert(data.data.error);
          // alert(data.data[error]);
          // $scope.successMessage = "Form submitted successfully";
            $scope.registrations=data;
            if(data.data.error != '')
            {
             $scope.alertMsg = true;
             $scope.alertMessage = data.data.error;
            }
            else
            {
              $scope.alertClass = 'alert-success';
              $scope.alertMessage = data.data.message;
              $scope.registerData = {};
            }
            // window.location = 'index.html';
        });
        
    };
  // $scope.reset();
}]);


   var app = angular.module('MyApp', ["ngStorage"])  
        app.controller('MyController', function ($scope, $localStorage, $window) {  
            $scope.Save = function () {  
                $localStorage.LocalMessage = $scope.Name + $scope.Address;  
  
  
                $window.open('http://localhost/codeigniter/angularJs/demo2.html', 'testpopup', 'width=500,height=400');  
            }  
  
        });  



