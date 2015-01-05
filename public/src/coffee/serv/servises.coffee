class Authenticate
  constructor: ($resource) ->
    return $resource "/login/"

class Registration
  constructor: ($resource) ->
    return $resource "/registration/"

class Flash
  constructor: (@$rootScope) ->

  show: (message) ->
    @$rootScope.flash = message
  clear: () ->
    @$rootScope.flash = ""

angular.module('app')
.factory('Authenticate', ['$resource', Authenticate])
.factory('Registration', ['$resource', Registration])
.factory('Flash', ['$rootScope', Flash])