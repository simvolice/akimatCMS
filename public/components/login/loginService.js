/**
 * Created by Admin on 29.09.2016.
 */






angular.module('app').factory("SendAuth", function($resource) {
  return $resource("/auth");
});


