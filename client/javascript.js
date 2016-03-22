var myApp = angular.module("myModule",['ngRoute','ui.bootstrap','ngResource','ngAnimate','nvd3']);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'homeController',
        templateUrl: "/partials/home.ejs"
    });
    $routeProvider.when('/home', {
        controller: 'homeController',
        templateUrl: "/partials/home.ejs"
    });
    $routeProvider.when('/checklist', {
        controller: 'checklistController',
        templateUrl: "/partials/checklist.ejs"
    });
    $routeProvider.when('/history', {
        controller: 'historyController',
        templateUrl: "/partials/history.ejs"
    });
    $routeProvider.when('/log', {
        controller: 'logController',
        templateUrl: "/partials/log.ejs"
    });
    $routeProvider.when('/help', {
        controller: 'helpController',
        templateUrl: "/partials/help.ejs"
    });
    $routeProvider.when('/configure', {
        controller: 'configureController',
        templateUrl: "/partials/configure.ejs"
    });
    $routeProvider.otherwise({redirectTo: '/'});
}]);


// Services
myApp.factory('Api', ['$resource', function($resource){
    return {
        Testlist: $resource('/api/checklist/:id', {id: '@id'})
    };
}]);

myApp.factory('ApiStages', ['$resource', function($resource){
    return {
        Teststage: $resource('/api/stages/:id', {id: '@id'})
    };
}]);

myApp.factory('ApiProjects', ['$resource', function($resource){
    return {
        Testproject: $resource('/api/projects/:id', {id: '@id'})
    };
}]);

myApp.factory('ApiHistory', ['$resource', function($resource){
    return {
        TestHistory: $resource('/api/itemhistory/:id', {id: '@id'})
    };
}]);

