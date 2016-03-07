var myApp = angular.module("myModule",['ngRoute','ui.bootstrap','ngResource','ngAnimate']);

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
    $routeProvider.otherwise({redirectTo: '/'});
}]);

myApp.controller("homeController",function($scope) {
    $scope.message = "Test message.";
});

// Services
myApp.factory('Api', ['$resource', function($resource){
    return {
        Testlist: $resource('/api/checklist/:id', {id: '@id'})
    };
}]);

myApp.controller('checklistController', ['$scope', 'Api', function($scope, Api) {
    $scope.form = {};
    $scope.testcases = [];
    $scope.nexNumber = 0;
    
    Api.Testlist.query({}, function(data){
        $scope.testcases = data;
    });
    
    $scope.delete = function(index) {
        bootbox.confirm("Are you sure?", function(answer) {
            if(answer == true)
                Api.Testlist.delete({id: $scope.testcases[index]._id}, function(data) {
                    $scope.testcases.splice(index, 1);
                    // bootbox.alert("Customer deleted!")
            });    
        });
    };
    
    $scope.addToDatabase = function() {
        Api.Testlist.save({}, $scope.form, function(data){
            $scope.testcases.push(data);
            $scope.form.number ++;
            // $scope.form.items = $scope.nexNumber;
            // $scope.form.rse = $scope.nexNumber;
            // $scope.form.result = $scope.nexNumber;
            $scope.form.comments = '';
            
            $scope.currentPage = $scope.testcases.length / $scope.pageSize;
        },
        function(err){
            bootbox.alert('Error: ' + err);
        });
    };
    
    $scope.edit = function(index){
        $scope.form.number = $scope.testcases[($scope.currentPage - 1) * $scope.pageSize + index].number;
        $scope.form.items = $scope.testcases[($scope.currentPage - 1) * $scope.pageSize + index].items;
        $scope.form.rse = $scope.testcases[($scope.currentPage - 1) * $scope.pageSize + index].rse;
        $scope.form.result = $scope.testcases[($scope.currentPage - 1) * $scope.pageSize + index].result;
        $scope.form.comments = $scope.testcases[($scope.currentPage - 1) * $scope.pageSize + index].comments;
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
    
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    
    $scope.pageChanged = function() {
        // console.log('Page changed to: ' + $scope.currentPage);
    };

}]);

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

myApp.filter('startFrom', function(){
    return function(data, start) {
        return data.slice(start);
    };
});