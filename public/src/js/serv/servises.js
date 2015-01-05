var Authenticate, Flash, Registration;

Authenticate = (function() {
  function Authenticate($resource) {
    return $resource("/login/");
  }

  return Authenticate;

})();

Registration = (function() {
  function Registration($resource) {
    return $resource("/registration/");
  }

  return Registration;

})();

Flash = (function() {
  function Flash($rootScope) {
    this.$rootScope = $rootScope;
  }

  Flash.prototype.show = function(message) {
    return this.$rootScope.flash = message;
  };

  Flash.prototype.clear = function() {
    return this.$rootScope.flash = "";
  };

  return Flash;

})();

angular.module('app').factory('Authenticate', ['$resource', Authenticate]).factory('Registration', ['$resource', Registration]).factory('Flash', ['$rootScope', Flash]);
