/**
 * intialize angularjs application and controller
 */
angular.module('loginFormApp', ['ngStorage'])
  .controller('ExampleController', 
    function ($scope, $http, $window,$localStorage) {
      $scope.user = {};
      $scope.login_form = true
      //   $window.localStorage.setItem('email', $scope.email);
      //   var username = $window.localStorage.getItem('email');
      //  $log.debug('username : ' + username);


      /**
       * calling login function 
       */
      $scope.login = function () {
        $localStorage.prevdata = $scope.user;
        $scope.user = $localStorage.prevdata;
        $scope.registrations = {};
        $http({
          method: 'post',
          dataType: 'json',
          data: $scope.user,
          url: 'http://localhost/codeigniter/sigin',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (data) {
          debugger
          // alert(data);
          // alert(data[error]);
          if (data.data.errr != '') {
            $scope.alertMsg = true;
            $scope.alertClass = 'alert-danger';
            $scope.alertMessage = data.data.errr;
          }
          else {
            //   location.reload(); 
            $window.location.href = 'http://localhost/codeigniter/angularJs/welcome.html';
            $scope.alertMsg = true;
            $scope.successMessage = "LOGIN successfully";
            $scope.registrations = data;
          }

        });

      };
    });

/**
 * jquery for input type to change color on mouse over
 */
$(document).ready(function () {
  $(".ip").mouseover(function () {
    $(".ip").css("background-color", "lightgray");
  })
  $(".ip").mouseout(function () {
    $(".ip").css("background-color", "white");
  })
});