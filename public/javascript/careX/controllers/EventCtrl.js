angular.module('CareX.controllers').controller('EventCtrl', [
  '$scope', 'EventService', '$routeParams', '$location', 'ArkService', function($scope, EventService, $routeParams, $location, ArkService)
  {
    "use strict";
    var _ = window._;
    var eventId = $routeParams.eventId;
    $scope.event = {
      startDate: {},
      endDate: {},
      geocode: {}
    };
    $scope.details = {};
    $scope.publishLabel = 'Preview';
    $scope.eventTypes = ['medicate', 'exercise', 'eat', 'connect', 'update-doctor'];
    $scope.frequencies = [
      {
        label: 'daily',
        days: 1
      },
      {
        label: '2 days',
        days: 2
      },
      {
        label: 'weekly',
        days: 7
      }
    ];
    $scope.options = {
      types: 'geocode'
    };
    $scope.details = {};
    $scope.$watch('details', function()
    {
      if (!_.isUndefined($scope.details) &&
        !_.isUndefined($scope.details.geometry) &&
        !_.isUndefined($scope.details.geometry.location))
      {
        $scope.event.geocode = {
          lat: $scope.details.geometry.location.lat(),
          long: $scope.details.geometry.location.lng()
        }
        $scope.event.locationName = $scope.details.formatted_address;
        console.log($scope.event);
      }
    });
    if (eventId != 0)
    {
      $scope.event._id = eventId;
      EventService.get($scope.event, function(Event)
      {
        $scope.event = Event;
      });
    }
    $scope.myEvents = function()
    {
      $location.path('/admin/events');
    }
    $scope.newEvent = function()
    {
      $location.path('/admin/event/0');
    };
    $scope.togglePreview = function()
    {
      $scope.preview = !$scope.preview;
      $scope.publishLabel = $scope.preview ? 'Edit' : 'Preview';
      $scope.lead = {
        fields: []
      };
      var fields = _.union($scope.event.fields, $scope.event.additional);
      $scope.lead.fields = _.map(fields, function(field)
      {
        return _.omit(field, ['accepted', 'value'])
      });
      $scope.previewTemplate = '/app/partials/lead/lead.html'
    };
    $scope.publish = function()
    {
      $scope.event.fields = _.map($scope.event.fields, function(field)
      {
        return _.omit(field, ['accepted', 'value'])
      });
      $scope.event.additional = _.map($scope.event.additional, function(field)
      {
        return _.omit(field, ['accepted', 'value'])
      });
      var event = new EventService($scope.event);
      event.$save(function(res)
      {
        $location.path('/admin/event/' + res._id)
        $scope.event = res;
      });
    };
  }]);
