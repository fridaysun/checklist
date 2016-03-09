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

myApp.factory('Check', ['$resource', function($resource){
    return {
        Testlist: $resource('/api/checknumber/:number', {number: '@number'})
    };
}]);

myApp.controller('checklistController', ['$scope', 'Api', function($scope, Api ) {
    $scope.form = {
        number: 1,
        testid: "1.1.1",
        priority : "Middle",
        workload: 8,
        completed: 0,
        result : "New",
        rse : "Frank.Gao"
    };
    $scope.testcases = [];
    $scope.nexNumber = 1;
    $scope.form.number = 1;
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    var totalItems = 0;
    var gotMatch = false;
    var currentID = '';
    var currentCaseNum;

    Api.Testlist.query({}, function(data){
        $scope.testcases = data;
        totalItems = data.length;
    });
    
    $scope.delete = function(index) {
        bootbox.confirm("Are you sure?", function(answer) {
            if(answer == true)
                Api.Testlist.delete({id: $scope.testcases[index]._id}, function(data) {
                    $scope.testcases.splice(index, 1);
                    // bootbox.alert("Customer deleted!")
            });    
        });
        
        totalItems --;
        currentID = '';

        console.log("Total docs in collections are: " + totalItems);
    };
    
    $scope.addToDatabase = function() {

        if(currentID != '') {
            for(var i=0; i<totalItems; i++) {
                if ($scope.testcases[i]._id == currentID) {
                    gotMatch = true;
                    console.log("Got match");
                    break;
                }
            }
        }

        if(gotMatch) {
            Api.Testlist.save({id: $scope.testcases[i]._id}, $scope.form, function(data){
                $scope.testcases[currentCaseNum] = data;
            });
        }
        else {
            Api.Testlist.save({}, $scope.form, function(data){
                totalItems ++;
                $scope.testcases.push(data);
                $scope.form.number ++;
                $scope.form.comments = '';
                bootbox.alert("New items added!");
            });
        }

        gotMatch = false;
        console.log("Total docs in collections are: " + totalItems);

    };
    
    $scope.edit = function(index) {
        currentID = $scope.testcases[index]._id;
        console.log(currentID);
        
        $scope.form = $scope.testcases[index];
    };
    
    $scope.clearForm = function() {
        $scope.form = {};
        $scope.form = {
            priority : "Middle",
            workload: 8,
            completed: 0,
            result : "New",
            rse : "Frank.Gao"
        };
        currentID = '';
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
    

    
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };
    
    $scope.pageChanged = function() {
        // console.log('Page changed to: ' + $scope.currentPage);
    };

}]);


myApp.filter('startFrom', function(){
    return function(data, start) {
        return data.slice(start);
    };
});