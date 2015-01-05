class App
  constructor: ->
    return [
      'ngResource'
      'ngSanitize'
      'ngRoute'
      'ui.router'
    ]


class RouteConfig
  constructor: ($stateProvider, $urlRouterProvider, $locationProvider) ->
    $locationProvider.html5Mode(true)
    $urlRouterProvider.otherwise("/")

    $stateProvider
      .state 'home',
        url: "/"
        templateUrl: "template/home",
        controller: 'homeController'
      .state 'register',
          url: "/register",
          templateUrl: "template/register",
          controller: 'registerController'


class ProviderConfig
  constructor: ($httpProvider) ->
    interceptor = ($rootScope,$location,$q,Flash) ->
      success = (response) ->
        response

      error = (response) ->
        if response.status == 401
          delete sessionStorage.authenticated
          $location.path '/'
          Flash.show response.data.flash

        $q.reject(response)
      (promise) ->
        promise.then success, error

    $httpProvider.responseInterceptors.push interceptor

class CSFRTocken
  constructor: ($rootScope, $http, CSRF_TOKEN) ->
    $http.defaults.headers.common['csrf_token'] = CSRF_TOKEN;

angular.module('app', new App())
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', RouteConfig])
.config(['$httpProvider', ProviderConfig])
.run(['$rootScope', '$http', 'CSRF_TOKEN', CSFRTocken])