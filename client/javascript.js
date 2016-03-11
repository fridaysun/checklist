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
    $routeProvider.otherwise({redirectTo: '/'});
}]);

myApp.controller("homeController",function($scope) {
    $scope.message = "AngularJS Home test message.";
});

myApp.controller("dounutController",function($scope) {
    $scope.options = {
            chart: {
                type: 'pieChart',
                height: 400,
                donut: true,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                title: "Risk:85%",

                pie: {
                    startAngle: function(d) { return d.startAngle -Math.PI },
                    endAngle: function(d) { return d.endAngle -Math.PI }
                },
                duration: 500,
                legend: {
                    margin: {
                        top: 5,
                        right: 30,
                        bottom: 5,
                        left: 5
                    }
                }
            }
        };

        $scope.data = [
            {
                color: "green",
                key: "Pass",
                y: 34
            },{
                color: "red",
                key: "Fail",
                y: 8
            },{
                color: "lightgrey",
                key: "Ongoing",
                y: 67
            },{
                color: "orange",
                key: "Warning",
                y: 3
            },{
                color: "darkblue",
                key: "Blocking",
                y: 4
            },{
                color: "blue",
                key: "Skip",
                y: 50
            }
        ];
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
        rse : "Frank.Gao",
        percent: 0
        
    };
    $scope.testcases = [];
    $scope.nexNumber = 1;
    $scope.form.number = 1;
    $scope.pageSize = 20;
    $scope.currentPage = 1;

    var totalItems = 0;
    var gotMatch = false;
    var currentID = '';
    var currentCaseNum = 0;
    var currentWorkload = 0;
    var currentCompleted = 0;
    
    $scope.totalWorkload = 0;
    $scope.totalCompleted = 0;
    $scope.totalPercent = 0;
    $scope.testMessage = "AngularJS test message";

    Api.Testlist.query({}, function(data){
        $scope.testcases = data;
        totalItems = data.length;
    
        for(var i=0; i< totalItems; i++) {
            $scope.totalWorkload = $scope.totalWorkload + $scope.testcases[i].workload;
            $scope.totalCompleted = $scope.totalCompleted + $scope.testcases[i].completed;
            $scope.totalPercent = Math.round($scope.totalCompleted/$scope.totalWorkload * 100);
        }
        console.log($scope.totalWorkload + " "+ $scope.totalCompleted + " "+ $scope.totalPercent);
    });

    


    $scope.delete = function(item) {
        bootbox.confirm("Are you sure?", function(answer) {
            if(answer == true)
                Api.Testlist.delete({id: item._id}, function(data) {
                    for(var i=0; i<$scope.testcases.length; i++) {
                        if($scope.testcases[i]._id == item._id) {
                            $scope.testcases.splice(i, 1);
                            break;
                        }
                    }
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
                    // console.log("Got match");
                    currentCaseNum = i;
                    break;
                }
            }
        }
        
        $scope.form.percent = Math.round($scope.form.completed/$scope.form.workload * 100);
        
        $scope.totalWorkload = $scope.totalWorkload - currentWorkload + $scope.form.workload;
        $scope.totalCompleted = $scope.totalCompleted - currentCompleted + $scope.form.completed;
        $scope.totalPercent = Math.round($scope.totalCompleted/$scope.totalWorkload * 100);
        console.log($scope.totalWorkload + " "+ $scope.totalCompleted + " "+ $scope.totalPercent);
        
        if(gotMatch) {
            Api.Testlist.save({id: $scope.testcases[i]._id}, $scope.form, function(data){
                //$scope.testcases[currentCaseNum] = data;
                bootbox.alert("Number: " + data.number + " Test case updated!");
            });
        }
        else {
            Api.Testlist.save({}, $scope.form, function(data){
                totalItems ++;
                $scope.testcases.push(data);
                $scope.form.number ++;
                $scope.form.comments = '';
                bootbox.alert("Number: " + data.number + "New items added!");
            });
        }

        gotMatch = false;
        console.log("Total docs in collections are: " + totalItems);

    };
    
    $scope.edit = function(item) {
        currentID = item._id;
        currentWorkload = item.workload;
        currentCompleted = item.completed;
        console.log(currentID);
        
        $scope.form = item;
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
    
    $scope.clearFilter = function() {
        $scope.search = {};
    };
    
    $scope.showDetails = function(index) {
        
        bootbox.dialog({
        title: "Details of the test items",

        message:    '<div class="row">' +
                    '<div class="col-md-12" style="padding:0 10px;">' +

                    '<table class="table table-hover table-condensed">' +
                    '<tr><td class="col-md-2">' +
                    '<strong> TestID: </strong>' +
                    '</td><td>' +
                    $scope.testcases[index].testid +
                    '</td></tr>' +
                    '<tr><td class="col-md-2">' +
                    '<strong> Items: </strong>' +
                    '</td><td>' +
                    $scope.testcases[index].items +
                    '</td></tr>' +
                    '<tr><td class="col-md-2">' +
                    '<strong> Priority: </strong>' +
                    '</td><td>' +
                    $scope.testcases[index].priority +
                    '</td></tr>' +
                    '<tr><td class="col-md-2">' +
                    '<strong> Workload: </strong>' +
                    '</td><td>' +
                    $scope.testcases[index].worklaod +
                    '</td></tr>' +
                    '<tr><td class="col-md-2">' +
                    '<strong> Result: </strong>' +
                    '</td><td>' +
                    $scope.testcases[index].result +
                    '</td></tr>' +
                    '<tr><td class="col-md-2">' +
                    '<strong> Stage: </strong>' +
                    '</td><td>' +
                    $scope.testcases[index].stage +
                    '</td></tr>' +
                    '<tr><td class="col-md-2">' +
                    '<strong> RSE: </strong>' +
                    '</td><td>' +
                    $scope.testcases[index].RSE +
                    '</td></tr>' +
                    '<tr><td class="col-md-2">' +
                    '<strong> Comments: </strong>' +
                    '</td><td>' +
                    $scope.testcases[index].comments +
                    '</td></tr>' +
                    '</table>' +
                    
                    '</div>' +
                    '</div>',
                

        //   message:  '<div class="row">' +
        //             '<div class="col-md-12" style="padding:0 10px;">' +
        //             'TestID: ' + $scope.testcases[index].testid +
        //             '</div>' + 
        //             '<div class="col-md-12">' +
        //             'Items: ' + $scope.testcases[index].items +
        //             '</div>' +
        //             '<div class="col-md-12">' +
        //             'Comments: ' + $scope.testcases[index].comments +
        //             '</div>' +
        //             '</div>',
          buttons: {
            main: {
              label: "OK",
              className: "btn-primary"
            }
          }
        });
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


angular.module("app", ["chart.js"]).controller("LineCtrl", function ($scope) {

  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
});


myApp.filter('startFrom', function(){
    return function(data, start) {
        return data.slice(start);
    };
});