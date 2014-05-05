'use strict';

var entry = angular.module('entry', []);

entry.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/:year/:month/:day/:permalink', {
      templateUrl: 'assets/partials/contents/entry/entryTmpl.html',
      controller: 'EntryCtrl'
    });

}]);

entry.controller('EntryCtrl', ['$scope', '$routeParams', '$http', '$sce', function($scope, $routeParams, $http, $sce) {
  $http.get('http://localhost:8080/morecat/api/entries/' + $routeParams.year + '/' + $routeParams.month + '/' + $routeParams.day + '/' + $routeParams.permalink).success(function(entry) {
    $scope.entry = entry;
    $scope.entry.year = new Date(entry.createdDate).getFullYear();
    $scope.entry.month = new Date(entry.createdDate).getMonth() + 1;
    $scope.entry.day = new Date(entry.createdDate).getDate();
    $scope.trustedContent = $sce.trustAsHtml(entry.content);
    var inlineTags = '';
    _.each(entry.tags, function(tag) {
      inlineTags += '[<a href="/tags/' + tag + '">';
      inlineTags += tag;
      inlineTags += '</a>]';
    });
    entry.inlineTags = $sce.trustAsHtml(inlineTags);
  });
}]);