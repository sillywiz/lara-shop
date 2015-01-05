var Home, Register;

Register = (function() {
  function Register($scope, $sanitize, $location, Authenticate, Registration, Flash) {
    $scope.alerts = [];
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
    $scope.login = function() {
      return Authenticate.save({
        'username': $sanitize($scope.username),
        'password': $sanitize($scope.password)
      }, function() {
        $location.path('/');
        return Flash.clear();
      }, function(response) {
        return $scope.alerts = [
          {
            type: "warning",
            msg: response.data.message
          }
        ];
      });
    };
    $scope.registration = function() {
      return Registration.save({
        'username': $sanitize($scope.username),
        'password': $sanitize($scope.password),
        'password_confirmation': $sanitize($scope.password_confirmation)
      }, function() {
        $location.path('/');
        Flash.clear();
        return sessionStorage.authenticated = true;
      }, function(response) {
        return $scope.alerts = response.data;
      });
    };
  }

  return Register;

})();

Home = (function() {
  function Home() {}

  return Home;

})();

angular.module('app').controller('registerController', ['$scope', '$sanitize', '$location', 'Authenticate', 'Registration', 'Flash', Register]).controller('homeController', [Home]);
