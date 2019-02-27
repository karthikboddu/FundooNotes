/**
 * intialize angularjs application and controller
 */
angular.module('loginFormApp', [])
  .controller('ExampleController', ['$scope', '$http',
    function ($scope, $http) {

      /**
       * calling register function 
       */
      $scope.register = function () {
        $scope.registrations = {};
        $http({
          method: 'post',
          dataType: 'json',
          data: $scope.user,
          url: 'http://localhost/codeigniter/insert',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (data) {
          $scope.alertMsg = true;
          debugger;
          // alert(data.data.error);
          // alert(data.data[error]);
          // $scope.successMessage = "Form submitted successfully";
          $scope.registrations = data;
          if (data.data.error != '') {
            $scope.alertMsg = true;
            $scope.alertMessage = data.data.error;
          }
          else {
            $scope.alertClass = 'alert-success';
            $scope.alertMessage = data.data.message;
            $scope.registerData = {};
          }
          // window.location = 'index.html';
        });

      };
      // $scope.reset();
    }]);

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