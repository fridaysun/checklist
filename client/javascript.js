var myApp = angular.module("myModule",['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        controller: 'homeController',
        templateUrl: "/partials/home.ejs"
    })

    .otherwise({redirectTo: '/'});
}]);

myApp.controller("homeController",function($scope) {
    $scope.message = "Test message.";
});

//register controller to module
myApp.controller("myController", function($scope){
    var testcases=
    [{
        number: 10,
        items: "Video test",
        rse: "Jason.Brown",
        result: "Pass",
        comments: "jQuery is a fast, small, and feature-rich Java like HTML document traversal and manipulation.",
        icon: "/images/favicon.ico"
    },{
        number: 2,
        items: "Control interface test",
        rse: "Sophie.Gao",
        result: "Pass",
        comments: "anda Elayan Thank you very much for taking time to give feedback. This means a lot.",
        icon: "/images/favicon.ico" 
    },{
        number: 3,
        items: "SPI test",
        rse: "Frank.Gao",
        result: "Pass",
        comments: "somtime to give feedback. This means a lot.",
        icon: "/images/favicon.ico"
    },{
        number: 4,
        items: "I2C test",
        rse: "Jeffery.Gao",
        result: "Warning",
        comments: "percase number - Formats a number as text. Includes comma as thousands separator and the number of decimal places can be spec",
        icon: "/images/favicon.ico" 
    }];
    
    $scope.testcases = testcases;
    
    $scope.edit = function(value){
        value.number ++;
    };
    
    $scope.remove = function(value){
        value.number --;
    };  
    
    $scope.sortColumn = "number";
    $scope.reverseSort = false;
    
    $scope.sortData = function(column) {
        $scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort : false;
        $scope.sortColumn = column;
    };
    
    $scope.getSortClass = function(column) {
        if ($scope.sortColumn == column) {
            return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
        }
        return '';
    };
    
    $scope.rowLimit = 5;
});