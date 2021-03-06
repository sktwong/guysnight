/*
 * Guy's Night Out - Big 2
 * index.js
 *
 * App configuration
 *
 */
var big2App = angular.module('big2App', ['ngRoute', 'LocalStorageModule', 'ui.bootstrap', 'ngMaterial']);

// Configure Routes
big2App.config(function($routeProvider) {
    $routeProvider
    // route for the home page
        .when('/', {
            templateUrl: 'modules/game/game.tmpl.html',
            controller: 'gameController'
        });
});

// Configure local storage plugin
big2App.config(function(localStorageServiceProvider) {
    localStorageServiceProvider.setStorageType('localStorage');
});
