class Register
  constructor: ($scope,$sanitize,$location,Authenticate,Registration,Flash) ->
    $scope.alerts = [];
    $scope.closeAlert = (index) ->
      $scope.alerts.splice(index, 1)
      return

    $scope.login = () ->
      Authenticate.save {
        'username': $sanitize $scope.username
        'password': $sanitize $scope.password
      }, () ->
        $location.path '/'
        Flash.clear()
        #sessionStorage.authenticated = true
      , (response) ->
        $scope.alerts = [{ type: "warning", msg: response.data.message }]

    $scope.registration = () ->
      Registration.save {
        'username': $sanitize $scope.username
        'password': $sanitize $scope.password
        'password_confirmation': $sanitize $scope.password_confirmation
      }, () ->
        $location.path '/'
        Flash.clear()
        sessionStorage.authenticated = true
      , (response) ->
        $scope.alerts = response.data

class Home
  constructor: () ->

angular.module('app')
.controller('registerController', ['$scope', '$sanitize', '$location', 'Authenticate', 'Registration', 'Flash', Register])
.controller('homeController', [Home])