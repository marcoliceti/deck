'use strict';

require('../../app');
var angular = require('angular');

angular.module('deckApp')
  .controller('ServerGroupBasicSettingsCtrl', function($scope, modalWizardService, settings) {

    $scope.select2Params = {
      ajax: {
        url: settings.oortUrl + '/search',
        data: function(term, page) {
          return {
            q: term,
            page: page,
            type: 'namedImages'
          };
        },
        results: function(data) {
          var results = data[0].results.map(function(result) {
            return {
              text: result.imageName + ' (' + result.imageId + ')',
              id: result.imageName
            };
          });
          return {results: results};
        }
      },
      initSelection: function(elem, callback) {
        if ($scope.command) {
          callback($scope.command.amiName);
        } else {
          callback('');
        }
      },
      minimumInputLength: 2
    };

    $scope.$watch('form.$valid', function(newVal) {
      if (newVal) {
        modalWizardService.getWizard().markClean('location');
      } else {
        modalWizardService.getWizard().markDirty('location');
      }
    });

  });
