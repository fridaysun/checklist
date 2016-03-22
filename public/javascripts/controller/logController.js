myApp.controller("logController",['$scope', 'ApiStages', 'ApiHistory', function($scope, ApiStages, ApiHistory) {
    $scope.message = "AngularJS Log test message.";
    $scope.logs = [];
    $scope.today = Date.now();


    ApiHistory.TestHistory.query({}, function(data){
        $scope.logs = data;
    });


    
}]);
