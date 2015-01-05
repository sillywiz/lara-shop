class Authenticate extends Factory
  constructor: ($resource) ->
    return $resource "/login/"

class Registration extends Factory
  constructor: ($resource) ->
    return $resource "/registration/"

class Flash extends Factory
  constructor: (@$rootScope) ->

  show: (message) ->
    @$rootScope.flash = message
  clear: () ->
    @$rootScope.flash = ""