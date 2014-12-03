'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatAnimations',

  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices'
]);

/*
myApp.config(function($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);
        $routeProvider
        .when('/page1', { template: 'page1.html', controller: 'Page1Ctrl' })
        .when('/page2', { template: 'page2.html', controller: 'Page2Ctrl' })
});
*/

phonecatApp.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);  
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);
