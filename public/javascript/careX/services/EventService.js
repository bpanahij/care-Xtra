angular.module('CareX.services').factory('EventService', [
  '$resource', function($resource)
  {
    'use strict';
    var Event = $resource('/events/:_id', {_id: '@id'});
    return Event;
  }]);