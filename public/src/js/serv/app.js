var App, CSFRTocken, ProviderConfig, RouteConfig;

App = (function() {
  function App() {
    return ['ngResource', 'ngSanitize', 'ngRoute', 'ui.router'];
  }

  return App;

})();

RouteConfig = (function() {
  function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");
    $stateProvider.state('home', {
      url: "/",
      templateUrl: "template/home",
      controller: 'homeController'
    }).state('register', {
      url: "/register",
      templateUrl: "template/register",
      controller: 'registerController'
    });
  }

  return RouteConfig;

})();

ProviderConfig = (function() {
  function ProviderConfig($httpProvider) {
    var interceptor;
    interceptor = function($rootScope, $location, $q, Flash) {
      var error, success;
      success = function(response) {
        return response;
      };
      error = function(response) {
        if (response.status === 401) {
          delete sessionStorage.authenticated;
          $location.path('/');
          Flash.show(response.data.flash);
        }
        return $q.reject(response);
      };
      return function(promise) {
        return promise.then(success, error);
      };
    };
    $httpProvider.responseInterceptors.push(interceptor);
  }

  return ProviderConfig;

})();

CSFRTocken = (function() {
  function CSFRTocken($rootScope, $http, CSRF_TOKEN) {
    $http.defaults.headers.common['csrf_token'] = CSRF_TOKEN;
  }

  return CSFRTocken;

})();

angular.module('app', new App()).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', RouteConfig]).config(['$httpProvider', ProviderConfig]).run(['$rootScope', '$http', 'CSRF_TOKEN', CSFRTocken]);
