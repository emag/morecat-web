'use strict';

var home = angular.module('home', []);

home.config(['$routeProvider', function config($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'assets/partials/contents/home/homeTmpl.html',
      controller: 'HomeCtrl'
    });

}]);

home.controller('HomeCtrl', ['$rootScope', '$scope', '$http', '$sce', 'DateFormat',
                function($rootScope, $scope, $http, $sce, DateFormat) {

  $http.get($rootScope.apiUrl + '/entries/recent').success(function(recent) {
    var entries = recent.elements;
    $scope.entries = entries;
    _.each(entries, function(entry) {
      entry.url = '/blog/' + DateFormat.format(new Date(entry.createdDate), 'YYYY/MM/DD/') + entry.permalink;
      var inlineTags = '';
      _.each(entry.tags, function(tag) {
        inlineTags += '[<a href="/blog/tags/' + tag + '">';
        inlineTags += tag;
        inlineTags += '</a>]';
      });
      entry.inlineTags = $sce.trustAsHtml(inlineTags);
    });
  });

  $http.get($rootScope.apiUrl + '/settings/blog-description').success(function(blogDescription) {
    $scope.blogDescription = blogDescription;
  });

  $rootScope.title = 'MoreCat Web';

}]);
