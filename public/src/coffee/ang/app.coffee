class App extends App
  constructor: ->
    return [
      'ngResource'
      'ngSanitize'
      'ngRoute'
      'ui.router'
    ]


class RouteConfig extends Config
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


class ProviderConfig extends Config
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

class CSFRTocken extends Run
  constructor: ($rootScope, $http, CSRF_TOKEN) ->
    $http.defaults.headers.common['csrf_token'] = CSRF_TOKEN;